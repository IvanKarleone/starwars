import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, forkJoin, map, Observable, tap } from "rxjs";

import { Film } from "../../../shared/models/film";
import { CHARACTER_FILMOGRAPHY_URL } from "../../../shared/helpers/urls";

@Injectable()
export class CharacterFilmographyService implements OnDestroy {
  private readonly isLoading$$ = new BehaviorSubject(false);
  readonly isLoading$ = this.isLoading$$.asObservable();

  private readonly isExistResults$$ = new BehaviorSubject(true);
  readonly isExistResults$ = this.isExistResults$$.asObservable();

  constructor(private httpClient: HttpClient) { }

  ngOnDestroy(): void {
    this.isLoading$$.complete();
    this.isExistResults$$.complete();
  }

  loadFilmography(filmIds: string): Observable<Film[]> {
    this.isExistResults$$.next(!!filmIds);
    this.isLoading$$.next(true);

    const requests = this.getRequests(filmIds);

    return forkJoin(requests).pipe(
      map((films: Film[]) => films.sort((a: Film, b: Film) => a.episode_id - b.episode_id)),
      tap(() => this.isLoading$$.next(false))
    );
  }

  private getRequests(filmIds: string): Observable<Film>[] {
    return filmIds
      .split(',')
      .map((filmId: string) => this.httpClient.get<Film>(`${CHARACTER_FILMOGRAPHY_URL}/${filmId}`));
  }
}
