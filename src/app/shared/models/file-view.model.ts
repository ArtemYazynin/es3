import { FileAttachment } from "./file-attachment.model";
import { Entity } from "./entity.model";

export class FileView extends Entity<number>{
    constructor(name: string, public index: number, public fileAttachment: FileAttachment) {
        super(fileAttachment.attachmentType, name);
    }
}
