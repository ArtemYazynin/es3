import { IValidationMessage } from "./IValidationMessage";

export class ValidationMessage implements IValidationMessage {
    requiredTwoCyrilicLetters: string = "Поле должно содержать две прописные русские буквы.";
    
    requiredNumberOfDigits(occurrence: number): string {
        return "Поле должно содержать число из " + occurrence + " цифр.";
    }
}