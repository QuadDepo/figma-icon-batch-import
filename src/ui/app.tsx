import { ChangeEvent, useCallback } from "react";
import { useActorRef, useSelector } from "@xstate/react";
import { uploadMachine } from "./state/uploadMachine";

function App() {
	const uploadMachineActor = useActorRef(uploadMachine, {
		inspect: (inspEvent) => {
			if (inspEvent.type === "@xstate.snapshot") {
				console.log(inspEvent.event);
				console.log(inspEvent.snapshot);
			}
		},
	});

	const uploadedFiles = useSelector(
		uploadMachineActor,
		(snapshot) => snapshot.context.output
	);

	const previewReady = useSelector(uploadMachineActor, (snapshot) =>
		snapshot.matches("preview")
	);

	const handleFileChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			if (!event.target.files) return;

			console.log("Files uploaded", event.target.files);

			uploadMachineActor.send({
				type: "UPLOAD_FILES",
				files: Array.from(event.target.files),
			});
		},
		[uploadMachineActor]
	);

	const handleRenderIcons = useCallback(() => {
		uploadMachineActor.send({
			type: "RENDER_ICONS",
		});
	}, [uploadMachineActor]);

	return (
		<main>
			<input
				type="file"
				accept=".svg,image/svg+xml"
				multiple
				onChange={handleFileChange}
			/>
			{previewReady && (
				<button onClick={handleRenderIcons}>Render Icons</button>
			)}
			{[...uploadedFiles].map(([key, data]) => (
				<div>
					{key}
					<svg dangerouslySetInnerHTML={{ __html: data }} />
				</div>
			))}
		</main>
	);
}

export default App;
