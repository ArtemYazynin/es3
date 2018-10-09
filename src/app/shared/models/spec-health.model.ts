import { Entity } from "./entity.model";

export class SpecHealth extends Entity<string>{
    code: number;
    constructor(id: string, name: string, code: number) {
        super(id, name);
        this.code = code;
    }
}
