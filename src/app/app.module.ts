import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { routing } from "./app.routing";

// app components
import { AppComponent } from './app.component';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { routing } from './app.routing';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { AuthService } from './auth/auth.service';

import { SearchresultsComponent } from './searchresults/searchresults.component';

// ng2 material design modules
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdInputModule } from '@angular2-material/input';
import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdMenuModule } from '@angular2-material/menu';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdIconModule } from '@angular2-material/icon';

@NgModule({
  declarations: [
    AppComponent,
    SearchboxComponent,
    SearchresultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MdToolbarModule.forRoot(),
    MdInputModule.forRoot(),
    MdCardModule,
    MdButtonModule,
    MdMenuModule,
    MdSidenavModule,
    MdIconModule
  ],
  providers: [AUTH_PROVIDERS, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
