import { FC, useMemo } from "react";

type Props = {
	svg: string;
	title: string;
};

const GridItem: FC<Props> = ({ svg }) => {
	return (
		<div className="p-2 md:p-4 border -mb-px -mr-px  border-gray-300">
			<div
				className="p-4"
				dangerouslySetInnerHTML={{
					__html: svg,
				}}
			/>
		</div>
	);
};

export default GridItem;
