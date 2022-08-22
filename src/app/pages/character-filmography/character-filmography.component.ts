import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable, of, switchMap } from "rxjs";

import { CharacterFilmographyService } from "./services/character-filmography.service";
import { Film } from "../../shared/models/film";

@Component({
  selector: 'app-character-filmography',
  templateUrl: './character-filmography.component.html',
  styleUrls: ['./character-filmography.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CharacterFilmographyService,
  ]
})
export class CharacterFilmographyComponent implements OnInit {
  filmography$: Observable<Film[]> = of([]);

  constructor(
    private characterFilmographyService: CharacterFilmographyService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadFilmography();
  }

  private loadFilmography(): void {
    this.filmography$ = this.activatedRoute.queryParams.pipe(
      switchMap((queryParams: Params) => this.characterFilmographyService.loadFilmography(queryParams['films']))
    );
  }
}
