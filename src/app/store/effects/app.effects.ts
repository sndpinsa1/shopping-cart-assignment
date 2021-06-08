import { switchMap, map, catchError } from 'rxjs/operators';
import { DataService } from './../../core/services/data.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromShared from '../../shared/store/actions/shared.actions';
import { Category } from 'src/app/shared/models/category';
import { of } from 'rxjs';
import { HomeEffects } from '../../features/home/store/effects/home.effects';
import { ProductEffects } from '../../features/products/store/effects/products.effects';

@Injectable()
export class AppEffects{
    constructor(
        private actions$:Actions,
        private dataService: DataService
    ){}

    fetchCategories = createEffect(()=>this.actions$.pipe(
        ofType(fromShared.fetchCategories),
        switchMap(()=>{
            return this.dataService.getCategories().pipe(
                map((cat:Category[])=> fromShared.setCategories({categories:cat})),
                catchError((error)=>{
                    return of(fromShared.catLoadFail({errorMessage:error.message}))
                })
            )
        })
    ))
}

export const ALL_EFFECTS = [AppEffects, HomeEffects, ProductEffects]
