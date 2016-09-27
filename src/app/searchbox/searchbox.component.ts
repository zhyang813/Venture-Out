import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})

export class SearchboxComponent {

  constructor(private auth: AuthService,
              private router: Router) {
  }

  onSearch(form) {
    console.log(form.value);
    this.router.navigate(['/searchresults']);
  }

}
