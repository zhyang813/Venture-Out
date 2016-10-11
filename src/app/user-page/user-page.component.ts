import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserPageService } from './user-page.service';
// import { Observable, Subscriber, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  favorites: any[];
  recommendations: any;
  zipCode: any;
  interests: any;

  constructor (private auth: AuthService,
              private userService: UserPageService) {
    this.userService.getFavorites().subscribe (
      data => this.favorites = data
    );
    // this.userService.getZipCode().subscribe(data => this.zipCode = data)
    // this.userService.getInterests().subscribe(data => this.interests = data)
    this.userService.getZipAndInterests().subscribe(
      data => {
        this.zipCode = data[0];
        this.interests = data[1];
      }, null,
      () => {
        console.log(this.zipCode, this.interests);
        this.userService.getRecommendations(this.zipCode, this.interests).subscribe(
          (data) => this.recommendations = data
        );
      }
    );

  }

  // getRecommendedEvents() {
  //   this.interests = this.userService.getRecommendations()
  // }

  ngOnInit() {
  }

}
