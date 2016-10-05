import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
// import { EventService } from '../../searchresults/searchresults.service';
import { UserPageService } from '../../user-page/user-page.service';



@Component({
  selector: 'app-event-select',
  templateUrl: './event-select.component.html',
  styleUrls: ['./event-select.component.css']
})
export class EventSelectComponent implements OnInit {
  events: any;

  constructor(private http: Http, private userService: UserPageService) {
    http.get(`/api/events/category/Music/zipcode/${this.userService.zipCode}/quantity/11`)
                  .subscribe(result => {
                    console.log(result.json());
                    this.events = result.json();
                  });
  }


  ngOnInit() {
  }
  onLike(event) {
    console.log(event);
  }
}
