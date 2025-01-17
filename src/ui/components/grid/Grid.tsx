import { FC } from "react";
import GridItem from "./GridItem";

type Props = {
	items: [string, string][];
};

const Grid: FC<Props> = ({ items }) => {
	return (
		<div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 p-4 xl:grid-cols-12 gap-4">
			{items.map(([title, svg]) => (
				<GridItem key={title} title={title} svg={svg} />
			))}
		</div>
	);
};

export default Grid;
