import { Routes, RouterModule } from '@angular/router';

import { SearchboxComponent } from './searchbox/searchbox.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';

const APP_ROUTES: Routes = [
  { path: '', component: SearchboxComponent },
  { path: 'searchresults', component: SearchresultsComponent }

];

export const routing = RouterModule.forRoot(APP_ROUTES);
