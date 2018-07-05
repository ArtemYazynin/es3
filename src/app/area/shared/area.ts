import { Entity } from "../../shared/entity";
import { AreaType } from "../../shared";

export class Area extends Entity<string>{
    areaType:AreaType;
    code:string;
}
