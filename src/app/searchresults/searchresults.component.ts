import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { EventService } from './searchresults.service';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
  // providers: [EventService] // Do not activate this, it creates new instance of the service
})
export class SearchresultsComponent {

  events: Array<any>;


  constructor(private auth: AuthService,
    private eventService: EventService) {

    this.getEvents();

  }

  onSearch(form) {
  }

  getEvents() {
    this.eventService
    .getEvents()
    .subscribe(data => this.events = data
      .filter( event => {
        return event.name.toLowerCase().includes(this.eventService.find.toLowerCase());
      }).filter( event => {
        return event.price > this.eventService.budget;
      }).filter( event => {
        return Date.parse (event.eventStartTime) > Date.parse (this.eventService.when);
      }).filter( event => {
        return event.genre.toLowerCase().includes(this.eventService.interest.toLowerCase());
      }),
      error => console.log(error),
      () => console.log('Get all events complete', this.events.length));

  }

}
