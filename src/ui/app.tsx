import { useCallback, useMemo } from "react";
import { useActorRef, useSelector } from "@xstate/react";
import { uploadMachine } from "./state/uploadMachine";

import Grid from "./components/grid/Grid";
import Dropzone from "./components/dropzone/Dropzone";
import Stepper, { Step } from "./components/stepper/Stepper";

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

	const status = useSelector(
		uploadMachineActor,
		(snapshot) => snapshot.context.status
	);

	const handleUpload = useCallback(
		(files: File[]) => {
			uploadMachineActor.send({
				type: "UPLOAD_FILES",
				files: Array.from(files),
			});
		},
		[uploadMachineActor]
	);

	const items = useMemo(() => {
		return Array.from(uploadedFiles.entries());
	}, [uploadedFiles]);

	return (
		<main>
			<Stepper actor={uploadMachineActor}>
				<Step step="idle">
					<Dropzone onUpload={handleUpload} />
				</Step>
				<Step step="processing">
					<div className="w-full h-full bg-gray-300 flex justify-center items-center">
						{status}
					</div>
				</Step>
				<Step step="preview">
					<Grid items={items} />
				</Step>
			</Stepper>
		</main>
	);
}

export default App;
