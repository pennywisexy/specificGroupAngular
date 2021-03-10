import { MoviesState } from './store/movies.state';
import { environment } from './../environments/environment';
import { AppGuard } from './app.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FilmListComponent } from './components/content/film-list/film-list.component';
import { VideoPlayerComponent } from './components/content/video-player/video-player.component';
import { MovieNewWindowComponent } from './components/layout/movie-new-window/movie-new-window.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { NgxsModule } from '@ngxs/store';
import { NgxsEmitPluginModule } from '@ngxs-labs/emitter';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import enLocale from '@angular/common/locales/en';
import ruLocale from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { QuillModule } from 'ngx-quill';

registerLocaleData(enLocale, 'en');
registerLocaleData(ruLocale, 'ru');

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    SmartSearchComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RatingModule,
    NgxsModule.forRoot([MoviesState], {
      developmentMode: !environment.production
    }),
    NgxsEmitPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    QuillModule.forRoot()
  ],
  providers: [AppGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
