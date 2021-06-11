import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { HttpErrorHandlerInterceptorService } from './http-error-handler-interceptor.service';
import { MessageService } from '../services/message.service';
import { MatModule } from '../../shared/mat.module';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { DataService } from '../services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HttpErrorHandlerInterceptorService', () => {
  let service: HttpErrorHandlerInterceptorService;
  let httpClient: HttpClient;
  let controller: HttpTestingController;
  let messageService:MessageService
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatModule, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        MessageService,
        DataService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorHandlerInterceptorService,
          multi: true,
        },
      ],
    });
    service = TestBed.inject(HttpErrorHandlerInterceptorService);
    httpClient = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(MessageService)
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

  it('should get error', (done: DoneFn) => {
    const errorMsg = "something went wrong";
    const spy = spyOn(messageService, 'error');
    httpClient.get('/test').subscribe(response => {},
      
    error=>{
      expect(spy).toHaveBeenCalled();
      done()
    })
    const request = controller.expectOne('/test')
    request.flush(errorMsg, { status: 401, statusText: 'Unauthorized' });
  });

  it('should get error Error Event', (done: DoneFn) => {
    const spy = spyOn(messageService, 'error');
    httpClient.get('/test').subscribe(response => {},
      
    error=>{
      expect(spy).toHaveBeenCalled();
      done()
    })
    const error = { error: {message: 'myText'}};
    const errorEvent: ErrorEvent = new ErrorEvent('', error);
    const request = controller.expectOne('/test')
    request.error(errorEvent, { status: 401, statusText: 'Unauthorized' });
  });


});
