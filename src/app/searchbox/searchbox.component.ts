import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { EventService } from '../searchresults/searchresults.service';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
  // providers: [EventService] // Do not activate this, it creates new instance of the service
})

export class SearchboxComponent {

  events: Array<any>;

  constructor(private auth: AuthService,
              private router: Router,
              private eventService: EventService) {

            // this.frontPageEvents();
  }

  public onSearch(form) {
    this.eventService.find = form.value.find ? form.value.find.toLowerCase() : '';
    this.eventService.budget = form.value.budget ? form.value.budget : 0;
    this.eventService.start = form.value.start ? form.value.start + 'T00:00:00Z' : '0000-01-01T00:00:00Z';
    this.eventService.end = form.value.end ? form.value.end + 'T00:00:00Z' : '9999-12-31T00:00:00Z';
    this.eventService.interest = form.value.interests ? form.value.interests.toLowerCase() : '';
    this.eventService.location = form.value.location ? form.value.location : '';
    this.router.navigate(['/searchresults']);
  }


  // Plan for front page recommendation
  public frontPageEvents () {

    let currentTime = new Date().toJSON().slice(0);

    this.eventService.getEvents()
    .subscribe(data => this.events = data
      .filter(event => {
        return Date.parse (event.eventStartTime) > Date.parse (currentTime);
      }),
      error => console.log(error),
      () => {
        if (this.events.length === 0) {
          alert('No matched results. Please try again.');
        } else {
          let randomIdx = [];
          let tempArray = [];
          for (let i = 0; i < 10; i++) {
            randomIdx.push(Math.floor(Math.random() * this.events.length));
          }
          randomIdx.forEach(index => tempArray.push(this.events[index]));
          this.events = tempArray.slice();
          console.log('Landing Page get events complete', this.events.length);
        }
      });
  }

}
