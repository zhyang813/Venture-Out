import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class TrendingService {
  keyWords: any;

  constructor(private http: Http) {}

  // server request to get words from keyWords collection with the highest counts
  public getKeyWordsFromDB() {
    return this.http.get('/api/keywords/').map(response =>
      response.json()
    );
  };

  // server request to add words to the keyWords collection
  // titles should be an array
  public addKeyWordsToDB(titles) {
    let body = JSON.stringify({titles: titles});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/keywords/', body, options).subscribe(function(response) {});
  }
}
