import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
})

export class SearchboxComponent {

  onSearch(form) {
    console.log(form);
  }

  constructor(private auth: AuthService) {
  }

}
