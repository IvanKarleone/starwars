import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterListComponent } from "./pages/character-list/character-list.component";
import { CharacterFilmographyComponent } from "./pages/character-filmography/character-filmography.component";
import { GetEntityIdPipe } from "./shared/pipes/get-entity-id.pipe";
import { GetFilmIdsPipe } from "./shared/pipes/get-film-ids.pipe";
import { BackButtonComponent } from './shared/components/back-button/back-button.component';
import { InfoBlockComponent } from './shared/components/info-block/info-block.component';
import { CacheInterceptor } from "./shared/interceptors/cache.interceptor";
import { STORAGE_TOKEN } from "./shared/tokens/storage.token";
import { LocalStorageService } from "./shared/services/local-storage.service";
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotFoundInterceptor } from "./shared/interceptors/not-found.interceptor";

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
    InfoBlockComponent,
    NotFoundComponent,
  ],
  providers: [
    {
      provide: STORAGE_TOKEN,
      useClass: LocalStorageService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotFoundInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
