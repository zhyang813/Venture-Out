import { Routes, RouterModule } from '@angular/router';

import { SearchboxComponent } from './searchbox/searchbox.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { UserPageComponent } from './user-page/user-page.component';
import { InteractiveHelperComponent } from './interactive-helper/interactive-helper.component';
import { CategorySelectComponent } from './interactive-helper/category-select/category-select.component';
import { EventSelectComponent } from './interactive-helper/event-select/event-select.component';

const APP_ROUTES: Routes = [
  { path: '', component: SearchboxComponent },
  { path: 'searchresults', component: SearchresultsComponent },
  { path: 'user', component: UserPageComponent },
  { path: 'helper', component: InteractiveHelperComponent },
  { path: 'category', component: CategorySelectComponent },
  { path: 'event-select', component: EventSelectComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
