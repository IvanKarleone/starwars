import { Pipe, PipeTransform } from "@angular/core";

import { Entity } from "../models/entity";
import { extractId } from "../helpers/extract-id";

@Pipe({
  name: 'getEntityId'
})
export class GetEntityIdPipe implements PipeTransform {
  transform(entity: Entity): string {
    return extractId(entity.url);
  }
}
