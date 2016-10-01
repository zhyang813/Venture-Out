import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
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
              private router: Router,
              private eventService: EventService) {

    this.getEvents();

  }

  onSearch(form) {

    this.eventService.find = form.value.find ? form.value.find.toLowerCase() : '';
    this.eventService.budget = form.value.budget ? form.value.budget : 10000000000;
    this.eventService.start = form.value.start ? form.value.start + 'T00:00:00Z' : '0000-01-01T00:00:00Z';
    this.eventService.end = form.value.end ? form.value.end + 'T00:00:00Z' : '9999-12-31T00:00:00Z';
    this.eventService.interest = form.value.interests ? form.value.interests.toLowerCase() : '';

    this.getEvents();
  }

  getEvents() {

    this.eventService.find = this.eventService.find ? this.eventService.find : '';
    this.eventService.budget = this.eventService.budget ? this.eventService.budget : 1000000000;
    this.eventService.start = this.eventService.start ? this.eventService.start : '0000-01-01T00:00:00Z';
    this.eventService.end = this.eventService.end ? this.eventService.end : '9999-12-31T00:00:00Z';
    this.eventService.interest = this.eventService.interest ? this.eventService.interest : '';

    this.eventService.getEvents()
    .subscribe(data => this.events = data
      .filter( event => {
        return event.name.toLowerCase().includes(this.eventService.find);
      }).filter( event => {
        return event.price <= this.eventService.budget;
      }).filter( event => {
        return Date.parse (event.eventStartTime) > Date.parse (this.eventService.start) &&
               Date.parse (event.eventStartTime) <= Date.parse (this.eventService.end);
      }).filter( event => {
        return event.genre ? event.genre.toLowerCase().includes(this.eventService.interest) : true;
      }),
      error => console.log(error),
      () => {
        if (this.events.length === 0) {
          alert('No matched results. Please try again.');
          this.router.navigate(['/']);
        } else {
          console.log('Get all events complete', this.events.length);
        }
      });

  }

}
