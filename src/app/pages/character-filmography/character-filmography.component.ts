import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { take, tap } from "rxjs";

import { CharacterFilmographyService } from "./services/character-filmography.service";
import { InfoMessage } from "../../shared/enums/info-message";

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
  readonly infoMessage = InfoMessage;

  constructor(
    public characterFilmographyService: CharacterFilmographyService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadFilmography();
  }

  private loadFilmography(): void {
    this.activatedRoute.queryParams.pipe(
      take(1),
      tap((queryParams: Params) => this.characterFilmographyService.loadFilmography(queryParams['films']))
    ).subscribe();
  }
}
