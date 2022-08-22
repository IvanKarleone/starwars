import { Pipe, PipeTransform } from "@angular/core";

import { Character } from "../models/character";
import { extractIdFromUrl } from "../helpers/extract-id-from-url";

@Pipe({
  name: 'getFilmIds'
})
export class GetFilmIdsPipe implements PipeTransform {
  transform(character: Character): string {
    return character.films
      .map((filmUrl: string) => extractIdFromUrl(filmUrl))
      .join(',');
  }
}
