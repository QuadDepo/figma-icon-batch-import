import { FC, useMemo } from "react";

type Props = {
	svg: string;
	title: string;
};

const GridItem: FC<Props> = ({ svg }) => {
	return (
		<div className="p-2 border border-gray-300 rounded-md shadow-sm">
			<div
				dangerouslySetInnerHTML={{
					__html: svg,
				}}
			/>
		</div>
	);
};

export default GridItem;
