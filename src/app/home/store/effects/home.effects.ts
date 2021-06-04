import { Category } from '../../../shared/shared/models/category';
import { DataService } from '../../../core/services/data.service';
import { Banner } from '../../../shared/shared/models/banner';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as HomeActions from '../actions/home.action';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class HomeEffects {

    fetchBanners = createEffect(()=> this.actions$.pipe(
        ofType(HomeActions.loadHomePageData),
        switchMap(()=>{
            return this.dataService.getBanners().pipe(
                map((banners:Banner[])=> HomeActions.setBanners({banners:banners})),
                catchError((error)=>{
                    return of(HomeActions.loadingFail({errorMessage:error.message}))
                })
            )
        })
    ))
    
    constructor(
        private actions$:Actions,
        private dataService: DataService
    ){}
}