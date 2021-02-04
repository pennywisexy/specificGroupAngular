import { SearchPipe } from './search.pipe';
import { AppGuard } from './app.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FilmListComponent } from './components/content/film-list/film-list.component';
import { VideoPlayerComponent } from './components/content/video-player/video-player.component';
import { MovieNewWindowComponent } from './components/layout/movie-new-window/movie-new-window.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { EditPageComponent } from './components/layout/edit-page/edit-page.component';
import { RatingPageComponent } from './components/layout/rating-page/rating-page.component';
import { RatingModule } from 'ng-starrating';
import { LayoutItemComponent } from './components/layout/layout-item/layout-item.component';
import { RegistrationPageComponent } from './components/layout/registration-page/registration-page.component';
import { RegistrationComponent } from './components/layout/registration-page/registration/registration.component';
import { LoginComponent } from './components/layout/registration-page/login/login.component';
import { SmartSearchComponent } from './components/layout/header/smart-search/smart-search.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmListComponent,
    VideoPlayerComponent,
    MovieNewWindowComponent,
    HeaderComponent,
    FooterComponent,
    EditPageComponent,
    RatingPageComponent,
    LayoutItemComponent,
    RegistrationPageComponent,
    RegistrationComponent,
    LoginComponent,
    SmartSearchComponent,
    SearchPipe
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
  providers: [AppGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
