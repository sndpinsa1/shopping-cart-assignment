import { Component, OnInit } from '@angular/core';
import { Category } from '../../../shared/shared/models/category';
import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { MessageService } from '../../../core/services/message.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images:Array<any> = [];
  categories:Category[] = [];
  constructor(
    private store:Store<fromApp.AppState>,
    private msgService:MessageService
  ) { }

  ngOnInit(): void {
    this.store.select('home').subscribe(
      homeState=>{
        this.images = homeState.banners.map(banner=> {return {"path":banner.bannerImageUrl}})
        if(homeState.errorMessage){
          this.msgService.show(homeState.errorMessage);
        }
      }
    )

    this.store.select('global').subscribe(
      globleState=>{
        if(globleState.errorMessage){
          this.msgService.show(globleState.errorMessage);
        }
        this.categories = globleState.categories;

      }
    )
  }

}
