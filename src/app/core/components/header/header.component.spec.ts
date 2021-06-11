import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { SharedModule } from '../../../shared/shared.module';
import { MessageService } from '../../services/message.service';
import { StoreModule } from '@ngrx/store';
import { appReducer, AppState } from '../../../store/reducers/app.reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../../../features/home/components/home/home.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { appState } from '../../../shared/mocks/app-state.mock';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let dialog:MatDialog;
  let messageService: MessageService;
  let store:MockStore;
  const initialState: AppState = appState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        MessageService,
        provideMockStore({ initialState }),

      ],
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    store = TestBed.inject(MockStore);
    messageService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be open dialog on button click when window width > 768', ()=>{
    const spy = spyOn(dialog, 'open');
    const cartEl: HTMLElement = fixture.nativeElement;
    const cartButton:any = cartEl.querySelector('a.cart');
    cartButton.click();
    expect(spy).toHaveBeenCalled();
  })

  it('should be open dialog on button click when window width < 768', ()=>{
    component.isDesktop = false;
    const spy = spyOn(router, 'navigate');
    const cartEl: HTMLElement = fixture.nativeElement;
    const cartButton:any = cartEl.querySelector('a.cart');
    cartButton.click();
    expect(spy).toHaveBeenCalled();
  })

  it('should be logout on logout button', ()=>{
    const cartEl: HTMLElement = fixture.nativeElement;
    const spy = spyOn(router, 'navigate');
    const spy2 = spyOn(messageService, 'show');
    const spy3 = spyOn(store, 'dispatch');
    component.logout();
    expect(component.loggedInUser.email).toBeFalsy();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();

  })


});
