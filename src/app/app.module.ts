import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { Ng2PaginationModule } from 'ng2-pagination';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

// app components
import { AppComponent } from './app.component';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { routing } from './app.routing';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { AuthService } from './auth/auth.service';
import { UserPageService } from './user-page/user-page.service';
import { UserPageComponent } from './user-page/user-page.component';
import { EventService } from './searchresults/searchresults.service';

// ng2 material design modules
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdInputModule } from '@angular2-material/input';
import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdMenuModule } from '@angular2-material/menu';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdIconModule } from '@angular2-material/icon';


import { InteractiveHelperComponent } from './interactive-helper/interactive-helper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategorySelectComponent } from './interactive-helper/category-select/category-select.component';
import { EventSelectComponent } from './interactive-helper/event-select/event-select.component';
import { TrendingComponent } from './trending/trending.component';
import { TrendingService } from './trending/trending.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchboxComponent,
    SearchresultsComponent,
    UserPageComponent,
    InteractiveHelperComponent,
    CategorySelectComponent,
    EventSelectComponent,
    TrendingComponent
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
    MdMenuModule.forRoot(),
    MdSidenavModule,
    MdIconModule,
    ReactiveFormsModule,
    Ng2PaginationModule,
    BootstrapModalModule,
    ModalModule.forRoot()
  ],
  providers: [AUTH_PROVIDERS, AuthService, EventService, UserPageService, TrendingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
