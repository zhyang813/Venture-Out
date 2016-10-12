import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { UserPageService } from '../../user-page/user-page.service';
import { Router } from '@angular/router';
import { TrendingService } from '../../trending/trending.service';

/*
  This component populates cards with event information that the user can like
  to gather more information about user preferences.
*/

@Component({
  selector: 'app-event-select',
  templateUrl: './event-select.component.html',
  styleUrls: ['./event-select.component.css']
})
export class EventSelectComponent {
  events: any;
  favorites: Array<string>;
  interests: Array<string>;
  titles: Array<string>;

  constructor(private http: Http,
              private userService: UserPageService,
              private router: Router,
              private trendingService: TrendingService) {

    this.grabEvents();
    this.titles = [];
  }

  // grab events by zip to populate page on initilization
  public grabEvents() {
    this.http.get(`/api/events/zipcode/${this.userService.zipCode}`)
    .subscribe(result => {
      this.events = result.json();
    });
    // TODO: add these events to user favorites
    this.favorites = [];
  }

  // when a user likes an event push to titles array
  public onLike(event) {
    this.titles.push(event.name);
  }

  // when user goes to the next page send titles to database using trending service function
  public goToNextPage() {
    this.trendingService.addKeyWordsToDB(this.titles);
    this.router.navigate(['/']);
  }

}
