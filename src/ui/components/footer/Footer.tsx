import { FC, ReactNode } from "react";

type Props = {
	children: ReactNode;
};

const Footer: FC<Props> = ({ children }) => {
	return (
		<div className="fixed gap-4 w-auto bottom-5 left-1/2 -translate-x-1/2 bg-white border border-gray-200 h-20 rounded-full flex items-center justify-between px-4 shadow-sm">
			{children}
		</div>
	);
};

export default Footer;
