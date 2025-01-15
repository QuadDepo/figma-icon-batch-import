import { setup, assign, fromCallback, ActorRefFrom } from "xstate";

const MIN_PROCESSING_DURATION = 1000;

export const base64ToSvg = (base64: string): string => {
	return atob(base64.replace("data:image/svg+xml;base64,", ""));
};

type UploadMachineEvents =
	| {
			type: "UPLOAD_FILES";
			files: File[];
	  }
	| {
			type: "PROCESSING_STATUS";
			status: string;
	  }
	| {
			type: "PROCESSED_FILES";
			files: Map<string, string>;
	  }
	| {
			type: "PROCESSING_COMPLETE";
	  }
	| {
			type: "PROCESSING_ERROR";
			id: string;
			error: string;
	  }
	| {
			type: "SET_PREFIX";
			prefix: string;
	  }
	| {
			type: "SET_SIZE";
			size: number;
	  }
	| {
			type: "RENDER_ICONS";
	  };

const CHUNK_SIZE = 50;

const importBatchedIcons = fromCallback(
	({
		input,
		sendBack,
	}: {
		input: {
			files: File[];
		};
		sendBack: (event: UploadMachineEvents) => void;
	}) => {
		const startTime = Date.now();

		const processFileChunk = async (startIndex: number) => {
			const fileMap = new Map<string, string>();
			const chunk = Array.from(input.files).slice(
				startIndex,
				startIndex + CHUNK_SIZE
			);

			if (chunk.length === 0) {
				const processingTime = Date.now() - startTime;
				const remainingTime = Math.max(
					0,
					MIN_PROCESSING_DURATION - processingTime
				);

				setTimeout(() => {
					sendBack({ type: "PROCESSING_COMPLETE" });
				}, remainingTime);
				return;
			}

			sendBack({
				type: "PROCESSING_STATUS",
				status: `Processing files ${startIndex + 1} to ${
					startIndex + chunk.length
				} of ${input.files.length}...`,
			});

			await Promise.allSettled(
				chunk.map(
					(file) =>
						new Promise<void>((resolve, reject) => {
							const reader = new FileReader();

							reader.onload = (event) => {
								const dataUrl = event.target?.result as string;
								if (dataUrl.includes("data:image/svg+xml")) {
									const svg = base64ToSvg(dataUrl);
									fileMap.set(file.name, svg);
								} else {
									sendBack({
										type: "PROCESSING_ERROR",
										id: file.name,
										error: `File ${file.name} is not a valid SVG`,
									});
								}
								resolve();
							};

							reader.onerror = () => {
								sendBack({
									type: "PROCESSING_ERROR",
									id: file.name,
									error: `Failed to read file ${file.name}`,
								});
								reject(new Error(`Failed to read file ${file.name}`));
							};

							reader.readAsDataURL(file);
						})
				)
			);

			sendBack({
				type: "PROCESSED_FILES",
				files: fileMap,
			});

			setTimeout(() => {
				processFileChunk(startIndex + CHUNK_SIZE);
			}, 100);
		};

		processFileChunk(0);
	}
);

export const uploadMachine = setup({
	types: {
		context: {} as {
			files: File[];
			output: Map<string, string>;
			errors: Map<string, string>;
			prefix: string;
			status: string;
			size: number;
		},
		events: {} as UploadMachineEvents,
	},
	actors: {
		importBatchedIcons,
	},
}).createMachine({
	context: {
		files: [],
		output: new Map(),
		errors: new Map(),
		status: "",
		prefix: "",
		size: 64,
	},
	on: {
		SET_PREFIX: {
			actions: assign(({ context, event: { prefix } }) => ({
				...context,
				prefix,
			})),
		},
		SET_SIZE: {
			actions: assign(({ context, event: { size } }) => ({
				...context,
				size,
			})),
		},
	},
	initial: "idle",
	states: {
		idle: {
			on: {
				UPLOAD_FILES: {
					actions: assign(({ context, event: { files } }) => ({
						...context,
						files,
					})),
					target: "processing",
				},
			},
		},
		processing: {
			invoke: {
				src: "importBatchedIcons",
				id: "importBatchedIcons",
				input: ({ context: { files } }) => ({
					files,
				}),
			},
			on: {
				PROCESSED_FILES: {
					actions: assign(({ context, event: { files } }) => ({
						output: new Map([...context.output, ...files]),
					})),
				},
				PROCESSING_ERROR: {
					actions: assign(({ context, event: { id, error } }) => {
						const errors = context.errors;
						errors.set(id, error);
						return {
							...context,
							errors,
						};
					}),
				},
				PROCESSING_STATUS: {
					actions: assign(({ context, event: { status } }) => ({
						...context,
						status,
					})),
				},
				PROCESSING_COMPLETE: {
					target: "preview",
				},
			},
		},
		preview: {
			on: {
				RENDER_ICONS: {
					actions: ({ context }) => {
						console.log("------------------------------");
						console.log("RENDERING ICONS");
						console.log(context);
						console.log("------------------------------");
					},
					target: "final",
				},
			},
		},
		final: {
			type: "final",
			actions: () => {
				console.log("CLOSING APP");
			},
		},
	},
});

export type UploadMachineActor = ActorRefFrom<typeof uploadMachine>;
