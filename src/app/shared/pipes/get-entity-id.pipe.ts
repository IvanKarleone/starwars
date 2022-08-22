import { Pipe, PipeTransform } from "@angular/core";

import { Entity } from "../models/entity";
import { extractIdFromUrl } from "../helpers/extract-id-from-url";

@Pipe({
  name: 'getEntityId'
})
export class GetEntityIdPipe implements PipeTransform {
  transform(entity: Entity): string {
    return extractIdFromUrl(entity.url);
  }
}
