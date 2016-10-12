import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { AuthService } from '../auth/auth.service';
import { TrendingService } from '../trending/trending.service';


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
              private auth: AuthService,
              private trendingService: TrendingService) {
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
      // Add to keywords to trending service
      // console.log(eventId)
      // this.trendingService.addKeyWordsToDB()
      return this.http.put('/api/user', body, options).subscribe(function(response){});
    } else {
      this.login = false;
    }
  }

}
