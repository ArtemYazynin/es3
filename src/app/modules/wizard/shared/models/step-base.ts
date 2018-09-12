
export abstract class StepBase{
    abstract inquiryType: string;
    abstract isValid(): boolean;
    abstract goTo: {
        back: () => void,
        next: () => void
    }
}
