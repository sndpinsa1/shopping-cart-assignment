import { DataService } from '../../../../core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/shared/models/category';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  categories:Category[] = []
  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('global').subscribe(
      globleState=> this.categories = globleState.categories
    )
  }

}
