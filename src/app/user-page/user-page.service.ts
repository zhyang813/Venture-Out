import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserPageService {

  constructor(private http: Http) { }

  public getFavorites() {
    let userProfile = JSON.parse(localStorage.getItem('profile'));
    return this.http.get('/api/user/favorites/' + userProfile.user_id).map(response =>
      response.json()
    );
  }

}
