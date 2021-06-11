import { DataService } from '../../../../core/services/data.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ProductActions from '../actions/products.action';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductEffects{

    constructor(
        private actions$:Actions,
        private dataService: DataService
        ){
    }

    loadProducts = createEffect(()=> this.actions$.pipe(
        ofType(ProductActions.loadProducts),
        switchMap((action)=>{
            return this.dataService.getProducts(action.id).pipe(
                map(products => ProductActions.setProducts({products, selectedCategoryId:action.id})),
                catchError(error=>{
                    return of(ProductActions.productLoadFailed({errorMsg:error.message}))
                })
            )
        })
    ))
    
}