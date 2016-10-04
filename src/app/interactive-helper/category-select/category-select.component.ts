import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.css']
})
export class CategorySelectComponent implements OnInit {
  categories: Array<any>;
  liked: Array<string>;
  disliked: Array<string>;

  constructor(private router: Router) {
    this.categories = [
      {genre: 'Music', imageUrl: '../../assets/StockPhotos/music-festivals.jpg'},
      {genre: 'Comedy', imageUrl: '../../assets/StockPhotos/comedy.jpg'},
      {genre: 'Dance', imageUrl: '../../assets/StockPhotos/dance.jpeg'},
      {genre: 'Drinking', imageUrl: '../../assets/StockPhotos/drinking.jpeg'},
      {genre: 'Concert', imageUrl: '../../assets/StockPhotos/concert.jpg'},
      {genre: 'Food', imageUrl: '../../assets/StockPhotos/food.jpg'},
      {genre: 'Classical', imageUrl: '../../assets/StockPhotos/classical.jpeg'}
    ];
    this.liked = [];
  }

  ngOnInit() {
  }

  onLike(event) {
    console.log(event);
    this.liked.push(event);
  }
  goToNextPage() {
    this.router.navigate(['event-select']);
  }


}
