import { Component, OnInit } from '@angular/core';
import { TrendingService } from './trending.service'
@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {
  trendingWords: Array<string>;

  constructor(private trendingService: TrendingService) {
    this.trendingService.getKeyWordsFromDB().subscribe( data => {
        console.log(data)
        this.trendingWords = data
      }
    )

  }

  ngOnInit() {
  }

}
