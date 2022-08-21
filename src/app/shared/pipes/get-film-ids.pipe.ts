import { Pipe, PipeTransform } from "@angular/core";

import { Character } from "../models/character";
import { extractId } from "../helpers/extract-id";

@Pipe({
  name: 'getFilmIds'
})
export class GetFilmIdsPipe implements PipeTransform {
  transform(character: Character): string {
    return character.films
      .map((filmUrl: string) => extractId(filmUrl))
      .join(',');
  }
}
