import { Entity } from "./entity";

export class FileView extends Entity<number>{
    constructor(id:number, name:string, public index:number){
        super(id,name);
    }
}
