import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { routing } from "./app.routing";
import { SearchresultsComponent } from './searchresults/searchresults.component'

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
