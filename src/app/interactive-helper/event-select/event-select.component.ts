import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';


@Component({
  selector: 'app-event-select',
  templateUrl: './event-select.component.html',
  styleUrls: ['./event-select.component.css']
})
export class EventSelectComponent implements OnInit {
  events: any;

  constructor(private http: Http) {
    http.get('/api/events/category/Music/zipcode/90081/quantity/10')
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
