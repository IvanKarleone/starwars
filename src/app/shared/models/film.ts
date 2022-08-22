import { Entity } from "./entity";

export interface Film extends Entity {
  title: string;
  episode_id: number;
  release_date: string;
  director: string;
}
