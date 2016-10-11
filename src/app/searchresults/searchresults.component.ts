import { Component } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { EventService } from './searchresults.service';
declare var $: any;

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
  // providers: [Modal]
})

export class SearchresultsComponent {

  // Array to store events pulled from DB
  events: Array<any>;

  constructor(private auth: AuthService,
    private router: Router,
    private eventService: EventService,
    public overlay: Overlay,
    public modal: Modal) {

    // On page load, run this to get all events
    this.getEvents();

  }

  // Side bar search, store input data to shared service
  public onSearch(form) {

    let currentDate = new Date().toJSON().slice(0, 10);
    let startDate = currentDate + 'T00:00:00Z';

    this.eventService.find = form.value.find ? form.value.find.toLowerCase() : '';
    this.eventService.budget = form.value.budget ? form.value.budget : 10000000000;
    this.eventService.start = form.value.start ? form.value.start + 'T00:00:00Z' : startDate;
    this.eventService.end = form.value.end ? form.value.end + 'T00:00:00Z' : '9999-12-31T00:00:00Z';
    this.eventService.interest = form.value.interests ? form.value.interests.toLowerCase() : '';
    this.eventService.location = form.value.location ? form.value.location : '';

    this.getEvents();
  }


  // Get all event method
  public getEvents() {

    let currentDate = new Date().toJSON().slice(0, 10);
    let startDate = currentDate + 'T00:00:00Z';

    this.eventService.find = this.eventService.find ? this.eventService.find.toLowerCase() : '';
    this.eventService.budget = this.eventService.budget ? this.eventService.budget : 1000000000;
    this.eventService.start = this.eventService.start ? this.eventService.start : startDate;
    this.eventService.end = this.eventService.end ? this.eventService.end : '9999-12-31T00:00:00Z';
    this.eventService.interest = this.eventService.interest ? this.eventService.interest : '';
    this.eventService.location = this.eventService.location ? this.eventService.location : '';

    // Invoke http request of getting all events, filtering data based on search inputs
    this.eventService.getEvents()
    .subscribe(data => this.events = data
      .filter( event => {
        return event.name ? event.name.toLowerCase().includes(this.eventService.find) : true;
      }).filter( event => {
        return event.price <= this.eventService.budget;
      }).filter( event => {
        return Date.parse (event.eventStartTime) > Date.parse (this.eventService.start) &&
        Date.parse (event.eventStartTime) <= Date.parse (this.eventService.end);
      }).filter( event => {
        return event.genre ? event.genre.toLowerCase().includes(this.eventService.interest) : true;
      }).filter( event => {
        return event.address ? (event.address.city.toLowerCase().includes(this.eventService.location.toLowerCase())) : true;
      }).sort(function (a, b) {
        if (Date.parse (a.eventStartTime) > Date.parse (b.eventStartTime)) {
          return 1;
        }
        if (Date.parse (a.eventStartTime) < Date.parse (b.eventStartTime)) {
          return -1;
        }
        return 0;
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

  public saveFavorite(event) {
    this.eventService.saveFavorite(event.eventId);
    if (!this.eventService.login) {
      this.modal.alert()
      .size('sm')
      .showClose(true)
      .title('Please Log In To Favorite Events!')
      .open();
      // console.log('Not log in');
    } else {
      $('#' + 'fava' + event.eventId).show();
      setTimeout(function() {
        $('#' + 'fava' + event.eventId).hide();
      }, 2000);
    }
  }

  public onClickPrice(event) {
    // console.log('onclickprice', event.eventId);
    $('#' + event._id).hide();
    $('#' + event.eventId).toggle();
  }

  public onClickLoc(event) {
    $('#' + event.eventId).hide();
    $('#' + event._id).toggle();
  }

}

