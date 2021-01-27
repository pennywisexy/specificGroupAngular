import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FilmListComponent } from './components/content-components/film-list/film-list.component';
import { VideoPlayerComponent } from './components/content-components/video-player/video-player.component';
import { MovieNewWindowComponent } from './components/layout-components/movie-new-window/movie-new-window.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/layout-components/header/header.component';
import { FooterComponent } from './components/layout-components/footer/footer.component';
import { EditPageComponent } from './components/layout-components/edit-page/edit-page.component';
import { RatingPageComponent } from './components/layout-components/rating-page/rating-page.component';
import { RatingModule } from 'ng-starrating';

@NgModule({
  declarations: [
    AppComponent,
    FilmListComponent,
    VideoPlayerComponent,
    MovieNewWindowComponent,
    HeaderComponent,
    FooterComponent,
    EditPageComponent,
    RatingPageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
