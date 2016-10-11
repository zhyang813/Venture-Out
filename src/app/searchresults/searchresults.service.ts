import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { AuthService } from '../auth/auth.service';
// import 'rxjs'

@Injectable()
export class EventService {

  find: string;
  budget: number;
  start: string;
  end: string;
  interest: string;
  location: string;
  login: boolean = true;


  constructor(private http: Http,
              private auth: AuthService) {
  }

  // Http request to get all events from DB
  public getEvents () {
    return this.http.get('/api/events').map(res => res.json());
  }


  // Save favorite event to DB, making sure user is authenticated
  public saveFavorite(eventId) {
    if (this.auth.authenticated()) {
      let userProfile = JSON.parse(localStorage.getItem('profile'));
      let body = JSON.stringify({userId: userProfile.user_id, favoritedEvent: eventId});
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
      return this.http.put('/api/user', body, options).subscribe(function(response){});
    } else {
      this.login = false;
    }
  }
  // refactored out to node services
  // public eventTitlesToWords(titles) {
  //   this.keyWords = {};

  //   titles.forEach((title) => {
  //       title.split(' ').forEach((word) => {

  //           word = word.replace(/[^A-Za-z0-9]/g, '');
  //           if(this.keyWords[word]){
  //               this.keyWords[word] += 1
  //           } else {
  //               this.keyWords[word] = 1
  //           }
  //       })
  //   })
  //    // return keyWords
  // }

}
