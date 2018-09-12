import { Entity } from "./entity";

export class Status extends Entity<string>{
    name:string;
    isClosed:boolean;
    isPublic:boolean;
}
