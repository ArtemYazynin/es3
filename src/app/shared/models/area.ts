import { Entity } from "./entity";
import { AreaType } from "..";

export class Area extends Entity<string>{
    areaType:AreaType;
    code:string;
}
