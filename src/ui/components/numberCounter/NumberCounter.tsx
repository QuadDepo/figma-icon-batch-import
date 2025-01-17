import { motion, useSpring, useTransform } from "framer-motion";
import { FC, useEffect, useMemo } from "react";

type Props = {
	value: number;
	total: number;
};

const NumberCounter: FC<Props> = ({ value, total }) => {
	const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
	const display = useTransform(spring, (current) => Math.round(current));

	useEffect(() => {
		spring.set(value);
	}, [spring, value]);

	const digitCount = useMemo(() => total.toString().length, [total]);
	const placeholder = useMemo(() => "8".repeat(digitCount), [digitCount]);

	return (
		<div className="inline-block relative">
			<span className="invisible pointer-events-none">{placeholder}</span>
			<motion.span className="inline-block absolute right-0 text-right">
				{display}
			</motion.span>
		</div>
	);
};

export default NumberCounter;
