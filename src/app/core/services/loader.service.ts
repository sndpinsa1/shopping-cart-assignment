import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  showLoader = new BehaviorSubject<boolean>(false);

  _loaderStatus = this.showLoader.asObservable();

  constructor() {}

  set setLoaderStatus(isShowLoader: boolean) {
    this.showLoader.next(isShowLoader);
  }

  get loaderStatus(): Observable<boolean> {
    return this._loaderStatus;
  }
}
