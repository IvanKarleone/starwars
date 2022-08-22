import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, forkJoin, map, Observable, take, tap } from "rxjs";

import { Film } from "../../../shared/models/film";
import { CHARACTER_FILMOGRAPHY_URL } from "../../../shared/helpers/urls";

@Injectable()
export class CharacterFilmographyService implements OnDestroy {
  private readonly films$$ = new BehaviorSubject<Film[]>([]);
  readonly films$ = this.films$$.asObservable();

  private readonly isLoading$$ = new BehaviorSubject(false);
  readonly isLoading$ = this.isLoading$$.asObservable();

  private readonly isExistResults$$ = new BehaviorSubject(true);
  readonly isExistResults$ = this.isExistResults$$.asObservable();

  constructor(private httpClient: HttpClient) { }

  ngOnDestroy(): void {
    this.isLoading$$.complete();
    this.isExistResults$$.complete();
  }

  loadFilmography(filmIds: string): void {
    if (!filmIds) {
      this.isExistResults$$.next(false);
      return;
    }

    this.isLoading$$.next(true);
    const requests = this.getRequests(filmIds);

    forkJoin(requests).pipe(
      take(1),
      map((films: Film[]) => films.sort((a: Film, b: Film) => a.episode_id - b.episode_id)),
      tap((films: Film[]) => {
        this.films$$.next(films);
        this.isLoading$$.next(false);
      })
    ).subscribe();
  }

  private getRequests(filmIds: string): Observable<Film>[] {
    return filmIds
      .split(',')
      .map((filmId: string) => this.httpClient.get<Film>(`${CHARACTER_FILMOGRAPHY_URL}/${filmId}`));
  }
}
