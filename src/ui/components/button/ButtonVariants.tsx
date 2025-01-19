import { FC } from "react";
import { cva, cx } from "class-variance-authority";
import { ButtonBase, ButtonBaseProps } from "./BaseButton";

const defaultButtonStyles = cva(["border"], {
	variants: {
		intent: {
			none: [
				"bg-gray-200",
				"text-gray-800",
				"border-gray-300",
				"hover:bg-gray-300",
				"active:bg-gray-400",
			],
		},
	},
	defaultVariants: {
		intent: "none",
	},
});

const textButtonStyles = cva(
	["bg-transparent", "border-none", "hover:opacity-70"],
	{
		variants: {
			intent: {
				none: "text-gray-800",
				error: "text-red-600",
			},
		},
		defaultVariants: {
			intent: "none",
		},
	}
);

const errorButtonStyles = cva([
	"bg-red-600",
	"text-white",
	"border-red-700",
	"hover:bg-red-700",
	"active:bg-red-800",
]);

const gradientButtonStyles = cva([
	"before:absolute",
	"before:-inset-0.5",
	"before:rounded-full",
	"before:bg-gradient-to-r",
	"before:from-pink-500",
	"before:via-red-500",
	"before:to-yellow-500",
	"before:bg-[length:_200%_200%]",
	"before:[animation-duration:_6s]",
	"before:animate-border",
	"before:-z-10",
	"before:opacity-100",
	"bg-gray-200",
	"hover:!bg-transparent",
	"border-none",
	"hover:text-white",
]);

const Default: FC<ButtonBaseProps> = ({ className, ...props }) => (
	<ButtonBase className={cx(defaultButtonStyles(), className)} {...props} />
);

const Text: FC<ButtonBaseProps & { intent?: "none" | "error" }> = ({
	className,
	intent = "none",
	...props
}) => (
	<ButtonBase
		className={cx(textButtonStyles({ intent }), className)}
		{...props}
	/>
);

const Gradient: FC<ButtonBaseProps> = ({ className, ...props }) => (
	<ButtonBase className={cx(gradientButtonStyles(), className)} {...props} />
);

const Error: FC<ButtonBaseProps> = ({ className, ...props }) => (
	<ButtonBase className={cx(errorButtonStyles(), className)} {...props} />
);

export { Default, Text, Gradient, Error };
