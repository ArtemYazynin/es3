import { Entity } from "./entity.model";
import { AreaType } from "..";

export class Area extends Entity<string>{
    areaType:AreaType;
    code:string;
}
