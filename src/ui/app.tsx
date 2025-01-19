import { useCallback, useMemo } from "react";
import { useActorRef, useSelector } from "@xstate/react";
import { uploadMachine } from "./state/uploadMachine";

import Grid from "./components/grid/Grid";
import Dropzone from "./components/dropzone/Dropzone";
import Stepper, { Step } from "./components/stepper/Stepper";
import NumberCounter from "./components/numberCounter/NumberCounter";
import Footer from "./components/footer/Footer";
import { Button } from "./components/button/Button";

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

	const totalItems = useSelector(
		uploadMachineActor,
		(snapshot) => snapshot.context.files?.length
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
					<div className="w-full gap-4 h-full flex-col flex justify-center items-center">
						<h3 className=" text-6xl font-bold">
							<NumberCounter total={totalItems} value={items.length} />
							<span> / </span>
							{totalItems}
						</h3>
						<p className="text-2xl font-light italic">Icon's processed</p>
					</div>
				</Step>
				<Step step="preview">
					<Grid items={items} />
					<Footer>
						<Button.Text intent="error">Cancel</Button.Text>
						<Button.Gradient>Create Icon Set 🎉 </Button.Gradient>
					</Footer>
				</Step>
			</Stepper>
		</main>
	);
}

export default App;
