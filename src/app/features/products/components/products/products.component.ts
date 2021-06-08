import { DataService } from '../../../../core/services/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/reducers/app.reducer';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  private notifier = new Subject();
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store
      .select('global')
      .pipe(takeUntil(this.notifier))
      .subscribe((globleState) => (this.categories = globleState.categories));
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
