import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { UserPageService } from '../../user-page/user-page.service';
import { Router } from '@angular/router';
import { TrendingService } from '../../trending/trending.service';
declare var $: any;

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

    // TODO: add these events to user favorites
    this.favorites = [];
  };

  // grab events by zip to populate page on initilization
  public grabEvents() {
    this.http.get(`/api/events/zipcode/${this.userService.zipCode}`)
    .subscribe(result => {
      this.events = result.json();
    });
  };

  // when a user likes an event push to titles array, JQuery handling event highlight on selected events
  public onLike(event) {
    let exist = false;
    this.titles.forEach( (item, idx) => {
      if ( event.name === item ) {
        exist = true;
        this.titles.splice(idx, 1);
      }
    });
    // changes styling of border when event is liked
    if (exist) {
      $('#' + 'eve' + event.eventId).css('border-style', 'none');
    } else {
      this.titles.push(event.name);
      $('#' + 'eve' + event.eventId).css('border-style', 'groove');
    }
  };

  // when user goes to the next page send titles to database using trending service function
  public goToNextPage() {
    this.trendingService.addKeyWordsToDB(this.titles);
    this.router.navigate(['/']);
  };

}
