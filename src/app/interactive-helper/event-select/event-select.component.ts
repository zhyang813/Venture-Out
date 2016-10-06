import { Component } from '@angular/core';
import { Http } from '@angular/http';
// import { EventService } from '../../searchresults/searchresults.service';
import { UserPageService } from '../../user-page/user-page.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-event-select',
  templateUrl: './event-select.component.html',
  styleUrls: ['./event-select.component.css']
})
export class EventSelectComponent {
  events: any;
  count: number;
  favorite: Array<string>;
  constructor(private http: Http, private userService: UserPageService,
    private router: Router) {
    http.get(`/api/events/category/Music/zipcode/${this.userService.zipCode}/quantity/12`)
                  .subscribe(result => {
                    console.log(result.json());
                    this.events = result.json();
                  });
    this.favorite = [];
  }


  onLike(event) {
    this.favorite.push('placeholder');
  }
  goToNextPage() {
    this.router.navigate(['/']);
  }

}
