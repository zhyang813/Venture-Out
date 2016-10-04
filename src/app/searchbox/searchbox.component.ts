import { Component, ElementRef} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { EventService } from '../searchresults/searchresults.service';

@Component({
  selector: 'app-searchbox',
  host: {
      '(document:click)': 'handleClick($event)',
  },
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css']
  // providers: [EventService] // Do not activate this, it creates new instance of the service
})

export class SearchboxComponent {

  events: Array<any>;

  constructor(private auth: AuthService,
              private router: Router,
              private eventService: EventService,
              myElement: ElementRef) {

            this.frontPageEvents();
            this.elementRef = myElement;
            this.selectedIdx = -1;
  }

  onSearch(form) {
    this.eventService.find = form.value.find ? form.value.find.toLowerCase() : '';
    this.eventService.budget = form.value.budget ? form.value.budget : 0;
    this.eventService.start = form.value.start ? form.value.start + 'T00:00:00Z' : '0000-01-01T00:00:00Z';
    this.eventService.end = form.value.end ? form.value.end + 'T00:00:00Z' : '9999-12-31T00:00:00Z';
    this.eventService.interest = form.value.interests ? form.value.interests.toLowerCase() : '';
    this.router.navigate(['/searchresults']);
  }

  frontPageEvents () {

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

  // auto complete function
  public query = '';
  public interests = ['Arts', 'Entertainment', 'Family',
                      'Festival', 'Fitness', 'Food', 'Music',
                      'Nightlife', 'Networking', 'Outdoors',
                      'Sports', 'Theater'];
   public filteredList = [];
   public elementRef;
   selectedIdx: number;

   filter(event: any) {
        if (this.query !== '') {
            this.filteredList = this.interests.filter(function (el) {
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
            if (event.code === 'ArrowDown' && this.selectedIdx < this.filteredList.length) {
                this.selectedIdx++;
            } else if (event.code === 'ArrowUp' && this.selectedIdx > 0) {
                this.selectedIdx--;
            }
        } else {
            this.filteredList = [];
        }
    }

    select(item) {
        this.query = item;
        this.filteredList = [];
        this.selectedIdx = -1;
        console.log('this is this query', this.query);
    }

    handleBlur() {
        if (this.selectedIdx > -1) {
            this.query = this.filteredList[this.selectedIdx];
        }
        this.filteredList = [];
        this.selectedIdx = -1;
    }

    handleClick(event) {
        let clickedComponent = event.target;
        let inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.filteredList = [];
        }
        this.selectedIdx = -1;
    }

}
