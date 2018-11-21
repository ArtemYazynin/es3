import { FileAttachment } from "./file-attachment.model";

export class FilesInfo {
    constructor(public files: Array<FileAttachment>, public haveDigitalSignature: boolean){}
}
