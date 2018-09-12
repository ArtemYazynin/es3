import { Entity } from "./entity";


export class RelationType extends Entity<string>{
    public confirmationDocument: boolean;
    constructor(id: string, name: string, confirmationDocument: boolean) {
        super(id, name);
        this.confirmationDocument = confirmationDocument;
    }
}
