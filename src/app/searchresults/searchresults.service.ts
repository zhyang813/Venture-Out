import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import 'rxjs'

@Injectable()
export class EventService {

  constructor(private http: Http) {

  }

  getEvents () {
    return this.http.get('/api/events').map(res => res.json());
  }
}
