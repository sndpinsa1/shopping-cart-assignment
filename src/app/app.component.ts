import { Component, OnInit } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isLoading:boolean;
  constructor(
    private router: Router,
    private loader: LoaderService
    ){
    
  }

  ngOnInit(){
    this.loader.loaderStatus.subscribe(isShow=>{
      this.isLoading = isShow;
    })
    this.router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((evt : RouterEvent) => {
      if (evt instanceof NavigationStart) {
        this.loader.setLoaderStatus(true);
      }
      if (evt instanceof NavigationEnd) {
        setTimeout(()=>{
        this.loader.setLoaderStatus(false);

        },300)
      }
  
      // Set loading state to false in both of the below events to hide the spinner in case a request fails
      if (evt instanceof NavigationCancel) {
        this.loader.setLoaderStatus(true);

      }
      if (evt instanceof NavigationError) {
        setTimeout(()=>{
        this.loader.setLoaderStatus(false);
        },300)
      }
    })
  }
}
