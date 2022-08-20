import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { PaginationService } from "./pagination.service";
import { Pagination } from "../models/pagination";

@Injectable()
export class SearchService {
  constructor(private paginationService: PaginationService) { }

  search(value: string, url: string): Observable<Pagination> {
    const params = new HttpParams().set('search', value);

    return this.paginationService.getPagination(url, params);
  }
}
