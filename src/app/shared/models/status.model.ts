import { Entity } from "./entity.model";

export class Status extends Entity<string>{
    isClosed: boolean;
    isPublic: boolean;
}
