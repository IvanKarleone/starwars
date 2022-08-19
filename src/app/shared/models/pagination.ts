import { Character } from "./character";

export interface Pagination {
  next: string;
  results: Character[];
}
