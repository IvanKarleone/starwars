import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharacterListComponent } from "./pages/character-list/character-list.component";
import { CharacterFilmographyComponent } from "./pages/character-filmography/character-filmography.component";

const routes: Routes = [
  { path: 'character-list', component: CharacterListComponent },
  { path: 'character-filmography/:id', component: CharacterFilmographyComponent },
  { path: '', redirectTo: 'character-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
