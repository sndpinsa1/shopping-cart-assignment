import { DataService } from './../../../common/data.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  categories:Category[] = []
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getCategories().subscribe(
      categories => this.categories = categories
    )
  }

}
