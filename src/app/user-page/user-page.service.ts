import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserPageService {

  userInformation: any;
  userProfile: any;
  userId: string;
  zipCode: string;
  interests: Array<string>;
  imgUrl: string;

  constructor(private http: Http) {
      this.userInformation = JSON.parse(localStorage.getItem('profile'));

      if (this.userInformation) {
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
        this.userId = this.userProfile.user_id;
      }

  }

  public getFavorites() {
    let userProfile = JSON.parse(localStorage.getItem('profile'));
    return this.http.get('/api/user/favorites/' + userProfile.user_id).map(response =>
      response.json()
    );
  };

  // TODO moves these to interactive-helper compoent service
  public addZipToDB() {

    this.userProfile = JSON.parse(localStorage.getItem('profile'));
    this.userId = this.userProfile.user_id;

    let body = JSON.stringify({
      userId: this.userId,
      zipCode: this.zipCode
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/user/addZipCode', body, options).subscribe(function(response){
      console.log(response);
    });
  };

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
  };
  // public getZipCode() {
  //   return this.http.get(`/api/user/${this.userId}/zipcode`)
  // }
  // public getInterests() {
  //   return this.http.get(`/api/user/${this.userId}/interests`)
  // }

  public getRecommendations(zip, interests) {
    interests = JSON.stringify(interests);
    let url = `/api/user/zipcode/${zip}/interests/${interests}`;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url, options).map(response =>
      response.json()
    );
  };

  public getZipAndInterests() {

    return Observable.forkJoin(
      this.http.get(`/api/user/${this.userId}/zipcode`).map((res: Response) => res.json()),
      this.http.get(`/api/user/${this.userId}/interests`).map((res: Response) => res.json())
    );

  };

  public addImgUrlToDB() {
    console.log("addImgUrlToDB happened");
    let body = JSON.stringify({
      userId: this.userId,
      imgUrl: this.imgUrl
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/user/addImgUrl', body, options).subscribe(function(response) {
      console.log(response);
    });
  };

  public getImgUrl() {
    console.log("getImgUrl happened");
    let userProfile = JSON.parse(localStorage.getItem('profile'));
    return this.http.get('/api/user/getImgUrl/' + userProfile.user_id).map(response =>
      response.json()
    );
  };
}
