import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Router, NavigationEnd, NavigationStart, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoading:boolean;
  constructor(
    private loader: LoaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loader.loaderStatus.subscribe(isShow=>{
      this.isLoading = isShow;
    })

    this.router.events.subscribe((evt : any) => {
      if (evt instanceof NavigationStart) {
        this.loader.setLoaderStatus = true;
      }
      if (evt instanceof NavigationEnd) {
        this.loader.setLoaderStatus = false;
      }
    })
    
  }

}
