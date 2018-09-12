import { FileAttachment } from "./file-attachment";
import { Entity } from "./entity";

export class FileView extends Entity<number>{
    constructor(name: string, public index: number, public fileAttachment: FileAttachment) {
        super(fileAttachment.attachmentType, name);
    }
}
