import { Routes, RouterModule } from '@angular/router';

import { SearchboxComponent } from './searchbox/searchbox.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { UserPageComponent } from './user-page/user-page.component';
import { InteractiveHelperComponent } from './interactive-helper/interactive-helper.component'
const APP_ROUTES: Routes = [
  { path: '', component: SearchboxComponent },
  { path: 'searchresults', component: SearchresultsComponent },
  { path: 'user', component: UserPageComponent },
  { path: 'helper', component: InteractiveHelperComponent }

];

export const routing = RouterModule.forRoot(APP_ROUTES);
