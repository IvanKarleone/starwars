import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Pagination } from "../models/pagination";

@Injectable()
export class PaginationService {
  private isAvailable$$ = new BehaviorSubject(true);
  isAvailable$ = this.isAvailable$$.asObservable();

  private page = 0;

  constructor(private httpClient: HttpClient) { }

  getPagination(url: string, params = new HttpParams()): Observable<Pagination> {
    this.page++;

    params = params.set('page', this.page);

    return this.httpClient.get<Pagination>(url, { params }).pipe(
      tap(({ next }: Pagination) => this.isAvailable$$.next(!!next))
    );
  }

  reset(): void {
    this.page = 0;
  }
}
