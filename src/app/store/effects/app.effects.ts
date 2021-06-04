import { switchMap, map, catchError } from 'rxjs/operators';
import { DataService } from './../../core/services/data.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromApp from '../';
import { Category } from 'src/app/shared/shared/models/category';
import { of } from 'rxjs';

@Injectable()
export class AppEffects{
    constructor(
        private actions$:Actions,
        private dataService: DataService
    ){}

    fetchCategories = createEffect(()=>this.actions$.pipe(
        ofType(fromApp.fetchCategories),
        switchMap(()=>{
            return this.dataService.getCategories().pipe(
                map((cat:Category[])=> fromApp.setCategories({categories:cat})),
                catchError((error)=>{
                    return of(fromApp.catLoadFail({errorMessage:error.message}))
                })
            )
        })
    ))
}
