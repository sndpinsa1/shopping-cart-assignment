import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { LoaderService } from '../../services/loader.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { RouterEvent, Router, NavigationStart, NavigationEnd } from '@angular/router';


// mocked source of events
const routerEventsSubject = new Subject<RouterEvent>();

const routerStub = {
    events: routerEventsSubject.asObservable()
};

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let router:Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderComponent ],
      providers:[
        LoaderService,
        {
          provide: Router,
          useValue: routerStub
      }
      ],
      // imports:[RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should not be loading while flag false', ()=>{
    const loaderEl:HTMLElement = fixture.nativeElement;
    component.isLoading = false;
    fixture.detectChanges();
    const div = loaderEl.querySelector('div');
    expect(div).toBeFalsy();
  })

  it('Should be loading while flag true', ()=>{
    const loaderEl:HTMLElement = fixture.nativeElement;
    component.isLoading = true;
    fixture.detectChanges();
    const div = loaderEl.querySelector('div');
    expect(div).toBeTruthy();
  })

  it('Should be isLoading true on navigation start', ()=>{
    routerEventsSubject.next(new NavigationStart(1, 'start'));
    expect(component.isLoading).toBeTruthy();
  })

  it('Should be isLoading false on navigation end', ()=>{
    routerEventsSubject.next(new NavigationEnd(1, 'start', 'end'));
    expect(component.isLoading).toBeFalsy();
  })


});
