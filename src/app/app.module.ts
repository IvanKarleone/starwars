import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterListComponent } from "./pages/character-list/character-list.component";
import { CharacterFilmographyComponent } from "./pages/character-filmography/character-filmography.component";
import { GetEntityIdPipe } from "./shared/pipes/get-entity-id.pipe";
import { GetFilmIdsPipe } from "./shared/pipes/get-film-ids.pipe";
import { BackButtonComponent } from './shared/components/back-button/back-button.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    CharacterListComponent,
    CharacterFilmographyComponent,
    GetEntityIdPipe,
    GetFilmIdsPipe,
    BackButtonComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
