import { Upload } from "@phosphor-icons/react";
import { useCallback, FC, ChangeEvent, DragEvent } from "react";

type Props = {
	onUpload?: (files: File[]) => void;
};

const Dropzone: FC<Props> = ({ onUpload }) => {
	const handleDrop = useCallback(
		(event: DragEvent<HTMLDivElement>) => {
			event.preventDefault();
			event.stopPropagation();

			const { files } = event.dataTransfer;

			if (!files) return;

			onUpload?.([...files]);
		},
		[onUpload]
	);

	const handleFileInput = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const { files } = event.target;

			if (!files) return;

			onUpload?.([...files]);
		},
		[onUpload]
	);

	const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	}, []);

	return (
		<div className="w-full h-full mx-auto p-6">
			<div
				className="relative h-full border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-4 
          border-gray-300 hover:border-gray-400 bg-gray-50 transition-colors
          [&:drag-over]:border-blue-500 [&:drag-over]:bg-blue-50"
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			>
				<input
					type="file"
					multiple
					className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
					onChange={handleFileInput}
				/>

				<Upload className="w-12 h-12 text-gray-400 group-[&:drag-over]:text-blue-500" />

				<div className="text-center">
					<p className="text-lg font-medium mb-1">Upload your icon set</p>
				</div>
			</div>
		</div>
	);
};

export default Dropzone;
