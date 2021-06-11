import { DataService } from '../../../../core/services/data.service';
import { Banner } from '../../models/banner';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as HomeActions from '../actions/home.action';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class HomeEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  fetchBanners = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.loadHomePageData),
      switchMap(() => {
        return this.dataService.getBanners().pipe(
          map((banners: Banner[]) =>
            HomeActions.setBanners({ banners })
          ),
          catchError((error) => {
            return of(HomeActions.loadingFail({ errorMessage: error.message }));
          })
        );
      })
    )
  );
}
