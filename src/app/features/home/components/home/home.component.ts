import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../../../shared/models/category';
import * as fromApp from '../../../../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { MessageService } from '../../../../core/services/message.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SliderConfig } from '../../constants/slider.config';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  images: Array<any> = [];
  categories: Category[] = [];
  private notifier = new Subject();
  carouselConfig = new SliderConfig();
  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select('home')
      .pipe(takeUntil(this.notifier))
      .subscribe((homeState) => {
        this.images = homeState.banners.map((banner) => {
        return { path: banner.bannerImageUrl }
        });
      });

    this.store
      .select('global')
      .pipe(takeUntil(this.notifier))
      .subscribe((globleState) => this.categories = globleState.categories);
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
