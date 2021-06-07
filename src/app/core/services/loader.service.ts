import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  showLoader = new BehaviorSubject<boolean>(false);

  loaderStatus = this.showLoader.asObservable();


  constructor() { }

  setLoaderStatus(isShowLoader:boolean):void{
    this.showLoader.next(isShowLoader);
  }
}
