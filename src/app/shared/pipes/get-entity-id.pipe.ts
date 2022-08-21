import { Pipe, PipeTransform } from "@angular/core";

import { Entity } from "../models/entity";

@Pipe({
  name: 'getEntityId'
})
export class GetEntityIdPipe implements PipeTransform {
  transform(entity: Entity): string {
    const regExpResult = entity.url.match(/\/[0-9]+\/$/);
    return regExpResult ? regExpResult[0].slice(1, -1) : '';
  }
}
