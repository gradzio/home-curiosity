import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { AppFullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { PresentationComponentsModule } from './shared/presentation-components/presentation-components.module';
import { HttpClientModule } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';
import { NgxsModule } from '@ngxs/store';
import { SubjectState } from './pages/subjects/subject.state';
import { ExercisesState } from './shared/smart-components/exercises/exercises.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
  declarations: [
    AppComponent,
    AppFullComponent,
    AppHeaderComponent,
    AppSidebarComponent
  ],
  imports: [
    NgxsModule.forRoot([
      SubjectState,
      ExercisesState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    PagesModule,
    PresentationComponentsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
