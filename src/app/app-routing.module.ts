import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharacterListComponent } from "./pages/character-list/character-list.component";
import { CharacterFilmographyComponent } from "./pages/character-filmography/character-filmography.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

const routes: Routes = [
  { path: 'character-list', component: CharacterListComponent },
  { path: 'character-filmography/:id', component: CharacterFilmographyComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '', redirectTo: 'character-list', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
