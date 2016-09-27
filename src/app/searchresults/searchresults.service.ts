import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import 'rxjs'

@Injectable()
export class EventService {

  constructor(private http: Http) {
    // this.httpModule = httpModule;
  }

  getEvents () {
    // return console.log('Service');
    return this.http.get('/api/events').map(res => res.json());
  }
}
