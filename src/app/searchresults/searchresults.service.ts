import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import 'rxjs'

@Injectable()
export class EventService {


  // public events: Array<any>;
  find: string;
  budget: number;
  start: string;
  end: string;
  interest: string;


  constructor(private http: Http) {}

  getEvents () {
    return this.http.get('/api/events').map(res => res.json());
  }

  // setSearchPara (find, budget, when, interest) {
  //   // this.find = find || '';
  //   // this.budget = budget || 0;
  //   // this.when = when || '0000-01-01T00:00:00Z;
  //   // this.interest = interest || '';
  //   //this.body.budget = budget;

  //   this.find = find? find : '';
  //   this.budget = budget? budget : 0;
  //   this.when = when + "T00:00:00Z";
  //   this.interest = interest? interest : 0;
  //   console.log('in service', this.budget, this.when, this.interest);
  //   //this.findEvents();
  // }

  // findEvents () {

    // let params = new URLSearchParams();
    // params.set('search', this.budget);
    // // params.set('when', this.when);
    // // params.set('interest', this.interest);
    // params.set('action', 'opensearch');
    // params.set('format', 'json');
    // params.set('callback', 'JSONP_CALLBACK');

    // return this.jsonp
    //            .('/api/seachevents', {search: params})
    //            .map(res => res.json());

    // this.getEvents()
    //     .subscribe(data => this.events = data,
    //       error => console.log(error),
    //       () => console.log('Get all events complete', this.events.length));

    // return this.events.filter(event => {
    //   return event.price >= this.budget;
    // }). filter (event => {
    //   return event.eventStartTime >= this.when;
    // }) .filter (event => {
    //   return event.genre.includes(this.interest);
    // }) .filter (event => {
    //   return event.name.includes(this.find);
    // })
  // }
}
