import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../../shared/shared/models/category';
import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { MessageService } from '../../../core/services/message.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  images:Array<any> = [];
  categories:Category[] = [];
  notifier = new Subject();
  constructor(
    private store:Store<fromApp.AppState>,
    private msgService:MessageService
  ) { }

  ngOnInit(): void {
    this.store.select('home')
    .pipe(takeUntil(this.notifier))
    .subscribe(
      homeState=>{
        this.images = homeState.banners.map(banner=> {return {"path":banner.bannerImageUrl}})
        if(homeState.errorMessage){
          this.msgService.show(homeState.errorMessage);
        }
      }
    )

    this.store.select('global')
    .pipe(takeUntil(this.notifier))
    .subscribe(
      globleState=>{
        if(globleState.errorMessage){
          this.msgService.show(globleState.errorMessage);
        }
        this.categories = globleState.categories;

      }
    )
  }

  ngOnDestroy():void{
    this.notifier.next();
    this.notifier.complete();
  }

}
