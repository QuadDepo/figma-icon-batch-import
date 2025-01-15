import { FC } from "react";
import GridItem from "./GridItem";

type Props = {
	items: [string, string][];
};

const Grid: FC<Props> = ({ items }) => {
	return (
		<div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
			{items.map(([title, svg]) => (
				<GridItem title={title} svg={svg} />
			))}
		</div>
	);
};

export default Grid;
