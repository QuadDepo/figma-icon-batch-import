import { UploadMachineActor } from "@ui/state/uploadMachine";
import { useSelector } from "@xstate/react";
import { Children, FC, isValidElement, ReactElement, ReactNode } from "react";

type Props = {
	actor: UploadMachineActor;
	children: ReactElement<typeof Step> | ReactElement<typeof Step>[];
};
type StepProps = {
	step: string;
	children: ReactNode;
};

export const Step: FC<StepProps> = ({ children }) => {
	return <>{children}</>;
};

const Stepper = ({ actor, children }: Props) => {
	const currentStep = useSelector(actor, (snapshot) => {
		return snapshot.value;
	});

	const activeStep = Children.toArray(children).find((child) => {
		if (!isValidElement(child)) return false;
		return child.props.step === currentStep;
	});

	return <>{activeStep || null}</>;
};

export default Stepper;
