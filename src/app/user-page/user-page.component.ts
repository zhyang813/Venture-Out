import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserPageService } from './user-page.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  favorites: any[];

  constructor(private auth: AuthService,
              private userService: UserPageService) {
    this.userService.getFavorites().subscribe(
      data => this.favorites = data
    );
  }


  ngOnInit() {
  }

}
