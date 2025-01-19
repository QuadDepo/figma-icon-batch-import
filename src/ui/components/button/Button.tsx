import { Default, Text, Gradient, Error } from "./ButtonVariants";
import { type ButtonBaseProps } from "./BaseButton";

const Button = Default as typeof Default & {
	Text: typeof Text;
	Gradient: typeof Gradient;
	Error: typeof Error;
};

Button.Text = Text;
Button.Gradient = Gradient;
Button.Error = Error;

export { Button };
export type { ButtonBaseProps };
