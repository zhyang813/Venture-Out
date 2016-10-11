import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()


export class TrendingService {
  keyWords: any;

  constructor(private http: Http) {}

  // refactoed to services for now
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
  // }
  public getKeyWordsFromDB() {
    // grab the globally most popular keywords from the collection
    return this.http.get('/api/keywords/').map(response =>
      response.json()
    )
  }

  public addKeyWordsToDB(titles) {
    // add keywords to the collection from this,keywords
    let body = JSON.stringify({titles: titles});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/keywords/', body, options).subscribe(function(response){});
  }
}
