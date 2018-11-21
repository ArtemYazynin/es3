import { AttachmentType } from "./attachment-type.enum";
import { Entity } from "./entity.model";

export class FileAttachment extends Entity<string>{
    constructor(id: string, name: string, public attachmentType: AttachmentType, public file?: any, public description?: string) {
        super(id, name)
    }

    static cast(fileAttachment?: FileAttachment): FileAttachment {
        let result = this.buildEmpty();
        if (!fileAttachment) return result;
        
        for (const key in fileAttachment) {
            if (fileAttachment.hasOwnProperty(key)) {
                result[key] = fileAttachment[key];
            }
        }
        return result;
    }

    static buildEmpty(type?:AttachmentType): FileAttachment {
        return new FileAttachment(undefined,undefined, type ? type : AttachmentType.Other);
    }

    
}
