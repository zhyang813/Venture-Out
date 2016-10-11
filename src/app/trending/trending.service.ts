import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class TrendingService {
  keyWords: any

  constructor(private http: Http) {}


  public eventTitlesToWords(titles) {
    this.keyWords = {};

    titles.forEach((title) => {
        title.split(' ').forEach((word) => {

            word = word.replace(/[^A-Za-z0-9]/g, '');
            if(this.keyWords[word]){
                this.keyWords[word] += 1
            } else {
                this.keyWords[word] = 1
            }
        })
    })
  }
  public getKeyWordsFromDB(){
    // grab the globally most popular keywords from the collection
  }
  public addKeyWordsToDB(){
    // add keywords to the collection from this,keywords
  }
}
