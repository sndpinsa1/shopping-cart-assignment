import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set Loader status to true', (done:DoneFn) => {
    service.setLoaderStatus = true;
    service.loaderStatus.subscribe((status)=>{
      expect(status).toBeTruthy();
      done();
    })
  });

  it('should set Loader status to false', (done:DoneFn) => {
    service.setLoaderStatus = false;
    service.loaderStatus.subscribe((status)=>{
      expect(status).toBeFalsy();
      done();
    })
  });

});
