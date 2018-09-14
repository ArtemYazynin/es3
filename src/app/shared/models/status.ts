import { Entity } from "./entity";

export class Status extends Entity<string>{
    isClosed: boolean;
    isPublic: boolean;
}
