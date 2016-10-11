import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserPageService } from '../../user-page/user-page.service';


@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.css']
})
export class CategorySelectComponent {
  categories: Array<any>;
  liked: Array<string>;
  disliked: Array<string>;

  constructor(private router: Router, private userService: UserPageService) {
    this.categories = [
      {genre: 'Music', imageUrl: '../../assets/StockPhotos/music-festivals.jpg'},
      {genre: 'Entertainment & Media', imageUrl: '../../assets/StockPhotos/comedy.jpg'},
      {genre: 'Dance', imageUrl: '../../assets/StockPhotos/dance.jpeg'},
      {genre: 'Drinking', imageUrl: '../../assets/StockPhotos/drinking.jpeg'},
      {genre: 'Concert', imageUrl: '../../assets/StockPhotos/concert.jpg'},
      {genre: 'Food', imageUrl: '../../assets/StockPhotos/food.jpg'},
      {genre: 'Classical', imageUrl: '../../assets/StockPhotos/classical.jpeg'},
      {genre: 'Fitness & Health', imageUrl: '../../assets/StockPhotos/fitness2.jpeg'},
      {genre: 'Business', imageUrl: '../../assets/StockPhotos/business.jpeg'},
      {genre: 'Technology', imageUrl: '../../assets/StockPhotos/technology.jpeg'}
    ];
    this.liked = [];
  }
  public onLike(event) {
    this.liked.push(event);
  }
  public goToNextPage() {
    this.userService.interests = this.liked;
    this.userService.addInterestsToDb(this.liked);
    this.router.navigate(['event-select']);
  }


}
