import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { routing } from './app.routing';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchboxComponent,
    SearchresultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [AUTH_PROVIDERS, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
