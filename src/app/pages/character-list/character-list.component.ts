import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

import { CharacterListService } from "./services/character-list.service";
import { PaginationService } from "../../shared/services/pagination.service";
import { SearchService } from "../../shared/services/search.service";
import { Character } from "../../shared/models/character";
import { SearchForm } from "./models/search-form";

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
  searchForm = new FormGroup<SearchForm>({
    search: new FormControl<string>('', { nonNullable: true })
  });

  constructor(public characterListService: CharacterListService) { }

  ngOnInit() {
    this.characterListService.init();
  }

  clickShowMore(): void {
    this.characterListService.loadCharacters();
  }

  clickSearch(): void {
    const searchValue = this.searchForm.controls.search.value;

    this.characterListService.searchCharacters(searchValue);
  }

  trackByFn(index: number, character: Character): string {
    return character.url;
  }
}
