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

  constructor(private auth: AuthService,
              private router: Router,
              private eventService: EventService ) {}

  onSearch(form) {

    this.eventService.find = form.value.find ? form.value.find : '';
    this.eventService.budget = form.value.budget ? form.value.budget : 0;
    this.eventService.when = form.value.when ? form.value.when + 'T00:00:00Z' : '0000-01-01T00:00:00Z';
    this.eventService.interest = form.value.interests ? form.value.interests : '';
    this.router.navigate(['/searchresults']);

  }

}
