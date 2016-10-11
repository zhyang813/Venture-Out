import { Component } from '@angular/core';
import { Http } from '@angular/http';
// import { EventService } from '../../searchresults/searchresults.service';
import { UserPageService } from '../../user-page/user-page.service';
import { Router } from '@angular/router';
// import  qs from './../../../../node_modules/qs/dist/qs.js';



@Component({
  selector: 'app-event-select',
  templateUrl: './event-select.component.html',
  styleUrls: ['./event-select.component.css']
})
export class EventSelectComponent {
  events: any;
  count: number;
  favorites: Array<string>;
  interests: Array<string>;
  keyWords: Array<string>;
  constructor(private http: Http, private userService: UserPageService,
    private router: Router) {
    this.grabEvents();
    this.keyWords = [];
  }

  public grabEvents() {

    // let categories = this.userService.interests;
    // console.log(this.userService.interests);
    // console.log(categories);
    // console.log(JSON.stringify(categories));
    // console.log(categories.toString());

    // this.http.get(`/api/events/category/${JSON.stringify(categories.toString())}/zipcode/${this.userService.zipCode}/quantity/12`)
    // .subscribe(result => {
    //   console.log(result.json());
    //   this.events = result.json();

    this.http.get(`/api/events/zipcode/${this.userService.zipCode}`)
    .subscribe(result => {
      console.log(result.json());
      this.events = result.json();
    });
    this.favorites = [];
  }
  public onLike(event) {
    console.log(event)
    this.keyWords.push(event);
    console.log(this.keyWords)
  }
  public goToNextPage() {
    this.router.navigate(['/']);
  }

}
