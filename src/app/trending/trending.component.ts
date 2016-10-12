import { Component } from '@angular/core';
import { TrendingService } from './trending.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent {
  trendingWords: Array<string>;

  constructor(private trendingService: TrendingService) {
     this.getTrendingKeyWordsOnInit();
  };
  // when the components loads make a request to the server to get an
  // array of trending keywords
  private getTrendingKeyWordsOnInit() {
    this.trendingService.getKeyWordsFromDB()
    .subscribe(data => this.trendingWords = data);
  };
}
