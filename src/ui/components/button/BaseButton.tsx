import type { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { cva, cx, VariantProps } from "class-variance-authority";

export const buttonStyles = cva(
	[
		"relative",
		"inline-block",
		"font-semibold",
		"rounded-full",
		"transition-all",
		"duration-200",
		"text-nowrap",
		"disabled:opacity-50",
		"disabled:cursor-not-allowed",
	],
	{
		variants: {
			size: {
				small: "text-sm px-4 py-2",
				medium: "text-base px-5 py-3",
				large: "text-lg px-6 py-4",
			},
		},
		defaultVariants: {
			size: "medium",
		},
	}
);

export type ButtonBaseProps = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonStyles> & {
		children: ReactNode;
		className?: string;
	};

export const ButtonBase: FC<ButtonBaseProps> = ({
	children,
	className,
	size = "medium",
	...props
}) => {
	return (
		<button
			className={cx(buttonStyles({ size }), className)}
			type="button"
			{...props}
		>
			{children}
		</button>
	);
};
