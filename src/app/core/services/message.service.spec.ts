import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { MatModule } from '../../shared/mat.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('MessageService', () => {
  let service: MessageService;
  let snackBar:MatSnackBar
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[MatModule, BrowserAnimationsModule]
    });
    service = TestBed.inject(MessageService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be called show method', () => {
     const spy = spyOn(snackBar, 'open');
    service.show('Success');
    expect(spy).toHaveBeenCalled();
  });

  it('should be called error', () => {
    const spy = spyOn(snackBar, 'open');
    service.error('Success');
    expect(spy).toHaveBeenCalled();
  });
});
