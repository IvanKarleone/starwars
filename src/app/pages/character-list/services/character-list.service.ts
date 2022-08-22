import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, shareReplay, take, tap } from "rxjs";

import { Character } from "../../../shared/models/character";
import { SearchService } from "../../../shared/services/search.service";
import { PaginationService } from "../../../shared/services/pagination.service";
import { CHARACTER_LIST_URL } from "../../../shared/helpers/urls";
import { Pagination } from "../../../shared/models/pagination";

@Injectable()
export class CharacterListService implements OnDestroy {
  private readonly characterList$$ = new BehaviorSubject<Character[]>([]);
  readonly characterList$ = this.characterList$$.asObservable();

  private readonly isLoading$$ = new BehaviorSubject(false);
  readonly isLoading$ = this.isLoading$$.pipe(
    shareReplay(1),
  );

  private readonly isExistResults$$ = new BehaviorSubject(false);
  readonly isExistResults$ = this.isExistResults$$.asObservable();

  readonly isAvailablePagination$ = this.paginationService.isAvailable$;

  constructor(private searchService: SearchService, private paginationService: PaginationService) { }

  ngOnDestroy(): void {
    this.characterList$$.complete();
    this.isLoading$$.complete();
    this.isExistResults$$.complete();
  }

  init(searchValue: string): void {
    this.paginationService.reset();
    this.loadCharacters(searchValue);
  }

  loadCharacters(searchValue: string): void {
    this.isLoading$$.next(true);

    this.handleCharactersAfterLoad$(searchValue).pipe(
      take(1),
      tap(({ results }: Pagination) => {
        const characterList = this.characterList$$.value.concat(results);
        this.characterList$$.next(characterList);
      })
    ).subscribe();
  }

  searchCharacters(searchValue: string): void {
    this.paginationService.reset();
    this.isLoading$$.next(true);

    this.handleCharactersAfterLoad$(searchValue).pipe(
      take(1),
      tap(({ results }: Pagination) => this.characterList$$.next(results))
    ).subscribe();
  }

  private handleCharactersAfterLoad$(searchValue: string): Observable<Pagination> {
    return this.searchService.search$(searchValue, CHARACTER_LIST_URL).pipe(
      tap(({ results }: Pagination) => {
        this.isExistResults$$.next(!!results.length);
        this.isLoading$$.next(false);
      })
    );
  }
}
