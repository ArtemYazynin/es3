import { Entity } from "./entity";

export class Institution extends Entity<string>{
    constructor(id: string, name: string, public institutionType: number) {
        super(id, name)
    }
}
