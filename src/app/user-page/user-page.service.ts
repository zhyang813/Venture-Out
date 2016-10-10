import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserPageService {

  userInformation: any;
  userId: string;
  zipCode: string;
  interests: Array<string>;

  constructor(private http: Http) {
    this.userInformation = JSON.parse(localStorage.getItem('profile'));
    this.userId = this.userInformation.user_id;
  }

  public getFavorites() {
    let userProfile = JSON.parse(localStorage.getItem('profile'));
    return this.http.get('/api/user/favorites/' + userProfile.user_id).map(response =>
      response.json()
    );
  }
  //TODO moves these to interactive-helper compoent service
  public addZipToDB() {
    let body = JSON.stringify({
      userId: this.userId,
      zipCode: this.zipCode
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/user/addZipCode', body, options).subscribe(function(response){
      console.log(response);
    });
  }
  public addInterestsToDb(interests) {
    let body = JSON.stringify({
      userId: this.userId,
      interests: interests
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/user/addInterests', body, options).subscribe(function(response){
      console.log(response);
    });
  }
  public getZipCode() {
    return this.http.get('/api/user/zipcode')
  }
  public getInterests() {
    return this.http.get('/api/user/interests')
  }
  public getRecommendations(zip, interests) {
    let url = `/api/user/getRecommendations/`
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url, options).map(response =>
      response.json()
    );
  }
}