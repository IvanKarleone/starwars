import { Entity } from "./entity";

export interface Character extends Entity {
  name: string;
  films: string[];
}
