import { DataService } from '../../../../core/services/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/shared/models/category';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  categories:Category[] = [];
  catSubscription:Subscription;
  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
   this.catSubscription = this.store.select('global').subscribe(
      globleState=> this.categories = globleState.categories
    )
  }

  ngOnDestroy(){
    this.catSubscription.unsubscribe();
  }

}
