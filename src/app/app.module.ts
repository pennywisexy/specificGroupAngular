import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { MovieNewWindowComponent } from './components/movie-new-window/movie-new-window.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { RatingPageComponent } from './components/rating-page/rating-page.component';

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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
