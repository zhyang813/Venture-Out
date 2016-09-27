import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { EventService } from './searchresults.service';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css'],
  providers: [EventService]
})
export class SearchresultsComponent {

  events: Array<any>;


  constructor(private auth: AuthService, private eventService: EventService) {

    this.getEvents();

  }
  onSearch(form) {
    console.log(form);
  }
  getEvents() {
    this.eventService
        .getEvents()
        .subscribe(data => this.events = data,
          error => console.log(error),
          () => console.log('Get all events complete', this.events));
  }
}
