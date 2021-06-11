import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { StoreModule, Store } from '@ngrx/store';
import * as fromApp from '../../../../store/reducers/app.reducer';
import { MessageService } from '../../../../core/services/message.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../../../../store/reducers/app.reducer';
import { appState } from '../../../../shared/mocks/app-state.mock';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;
  let initialState: AppState = appState;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        SharedModule
      ],
      providers: [
        MessageService,
        provideMockStore({initialState})
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
