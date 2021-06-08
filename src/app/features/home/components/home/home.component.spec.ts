import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { StoreModule, Store } from '@ngrx/store';
import * as fromApp from '../../../../store/reducers/app.reducer';
import { MessageService } from '../../../../core/services/message.service';
import { SharedModule } from 'src/app/shared/shared.module';
import * as HomeActions from '../../../home/store/actions/home.action';
import { DataService } from '../../../../core/services/data.service';
import { of } from 'rxjs';
fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let homeStore:Store;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [StoreModule.forRoot(fromApp.appReducer), SharedModule],
      providers:[
        MessageService,

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    homeStore = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should destory component', () => {
    
  })

  

});
