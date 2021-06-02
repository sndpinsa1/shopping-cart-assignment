import { DataService } from './../common/data.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images:Array<any> = [];
  categories:Category[] = [];
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getBanners().subscribe(
      response=>{
        this.images = response.map(banner => {
          return {"path":banner.bannerImageUrl}
        })
      }
    )

    this.dataService.getCategories().subscribe(
      categories=>this.categories = categories
    )
  }

}
