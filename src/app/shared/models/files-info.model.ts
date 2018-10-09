import { FileAttachment } from "./file-attachment.model";

export class FilesInfo {
    haveDigitalSignature:boolean = false;
    files: Array<FileAttachment>;
}
