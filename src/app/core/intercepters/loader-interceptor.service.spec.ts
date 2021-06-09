import { TestBed } from '@angular/core/testing';

import { LoaderInterceptorService } from './loader-interceptor.service';
import { MatModule } from '../../shared/mat.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';

describe('LoaderInterceptorService', () => {
  let service: LoaderInterceptorService;
  let httpClient: HttpClient;
  let controller: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatModule, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        LoaderService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptorService,
          multi: true,
        },
      ],
    });
    service = TestBed.inject(LoaderInterceptorService);
    httpClient = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get response', (done: DoneFn) => {
    const body = { camelCase: true }
    const expected = { camelCase: true }

    httpClient.get('/test').subscribe(response => {
      expect(response).toEqual(expected)
      done()
    })
    const request = controller.expectOne('/test')
    request.flush(body)
  });


});
