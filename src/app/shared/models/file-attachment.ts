import { AttachmentType } from "./attachment-type.enum";

export class FileAttachment{
    constructor(public attachmentType:AttachmentType, public file:any, public description?:string){

    }
}