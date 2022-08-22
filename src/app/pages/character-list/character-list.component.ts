import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { CharacterListService } from "./services/character-list.service";
import { PaginationService } from "../../shared/services/pagination.service";
import { SearchService } from "../../shared/services/search.service";
import { Character } from "../../shared/models/character";
import { SearchForm } from "./models/search-form";
import { InfoMessage } from "../../shared/enums/info-message";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    PaginationService,
    SearchService,
    CharacterListService,
  ]
})
export class CharacterListComponent implements OnInit {
  readonly searchForm = new FormGroup<SearchForm>({
    search: new FormControl<string>('', { nonNullable: true })
  });

  readonly infoMessage = InfoMessage;

  get searchControl(): FormControl<string> {
    return this.searchForm.controls.search;
  }

  constructor(public characterListService: CharacterListService) { }

  ngOnInit() {
    this.setControlValidators();
    this.characterListService.init(this.searchControl.value);
  }

  clickShowMore(): void {
    this.characterListService.loadCharacters(this.searchControl.value);
  }

  clickSearch(): void {
    this.characterListService.searchCharacters(this.searchControl.value);
  }

  trackByFn(index: number, character: Character): string {
    return character.url;
  }

  private setControlValidators(): void {
    this.searchControl.setValidators([Validators.pattern(/^[a-zA-Z0-9\-]*$/)]);
  }
}
