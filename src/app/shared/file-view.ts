import { Entity } from "./entity";
import { FileAttachment } from "./file-attachment";
import { AttachmentType } from "./attachment-type.enum";

export class FileView extends Entity<number>{
    constructor(name: string, public index: number, public fileAttachment: FileAttachment) {
        super(fileAttachment.attachmentType, name);
    }
}
