import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, shareReplay, take, tap } from "rxjs";

import { Character } from "../../../shared/models/character";
import { SearchService } from "../../../shared/services/search.service";
import { PaginationService } from "../../../shared/services/pagination.service";
import { CHARACTER_LIST_URL } from "../../../shared/helpers/urls";
import { Pagination } from "../../../shared/models/pagination";

@Injectable()
export class CharacterListService implements OnDestroy {
  private characterList$$ = new BehaviorSubject<Character[]>([]);
  characterList$ = this.characterList$$.pipe(
    shareReplay(1),
  );

  private isLoading$$ = new BehaviorSubject(false);
  isLoading$ = this.isLoading$$.pipe(
    shareReplay(1),
  );

  private isExistResults$$ = new BehaviorSubject(false);
  isExistResults$ = this.isExistResults$$.pipe(
    shareReplay(1),
  );

  isAvailablePagination$ = this.paginationService.isAvailable$;

  constructor(private searchService: SearchService, private paginationService: PaginationService) { }

  ngOnDestroy(): void {
    this.characterList$$.complete();
    this.isLoading$$.complete();
    this.isExistResults$$.complete();
  }

  init(): void {
    this.paginationService.reset();
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.isLoading$$.next(true);

    this.paginationService.getPagination(CHARACTER_LIST_URL).pipe(
      take(1),
      tap(({ results }: Pagination) => {
        const characterList = this.characterList$$.value.concat(results);
        this.characterList$$.next(characterList);
        this.isExistResults$$.next(!!results.length);
        this.isLoading$$.next(false);
      })
    ).subscribe();
  }

  searchCharacters(searchValue: string): void {
    this.isLoading$$.next(true);

    this.searchService.search(searchValue, CHARACTER_LIST_URL).pipe(
      take(1),
      tap(({ results }: Pagination) => {
        this.characterList$$.next(results);
        this.isExistResults$$.next(!!results.length);
        this.isLoading$$.next(false);

      })
    ).subscribe();
  }
}
