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

  // Landing page search event handling
  public onSearch(form) {

    // Search data processing
    this.eventService.find = form.value.find;
    this.eventService.budget = form.value.budget;
    this.eventService.start = form.value.start;
    this.eventService.end = form.value.end;
    this.eventService.interest = form.value.interests;
    this.eventService.location = form.value.location;
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
