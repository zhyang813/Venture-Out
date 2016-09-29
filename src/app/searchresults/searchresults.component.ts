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

    this.eventService.find = form.value.find ? form.value.find.toLowerCase() : '';
    this.eventService.budget = form.value.budget ? form.value.budget : 10000000000;
    this.eventService.when = form.value.when ? form.value.when + 'T00:00:00Z' : '0000-01-01T00:00:00Z';
    this.eventService.interest = form.value.interests ? form.value.interests.toLowerCase() : '';

    this.getEvents();
  }

  getEvents() {

    this.eventService.find = this.eventService.find ? this.eventService.find : '';
    this.eventService.budget = this.eventService.budget ? this.eventService.budget : 1000000000;
    this.eventService.when = this.eventService.when ? this.eventService.when : '0000-01-01T00:00:00Z';
    this.eventService.interest = this.eventService.interest ? this.eventService.interest : '';

    this.eventService.getEvents()
    .subscribe(data => this.events = data
      .filter( event => {
        return event.name.toLowerCase().includes(this.eventService.find);
      }).filter( event => {
        return event.price <= this.eventService.budget;
      }).filter( event => {
        return Date.parse (event.eventStartTime) > Date.parse (this.eventService.when);
      }).filter( event => {
        return event.genre ? event.genre.toLowerCase().includes(this.eventService.interest) : true;
      }),
      error => console.log(error),
      () => console.log('Get all events complete', this.events.length));

  }

}
