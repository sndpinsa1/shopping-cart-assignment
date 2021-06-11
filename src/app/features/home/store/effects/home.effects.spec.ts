import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { DataService } from '../../../../core/services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as homeAction from '../actions/home.action';
import { HomeEffects } from './home.effects';
import { mockBanners } from '../../../../shared/mocks/banners.mock';
let actions$ = new Observable<Action>();
let dataService: DataService;
let homeEffects: HomeEffects;
describe('Home effect test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeEffects, provideMockActions(() => actions$)],
    });
    homeEffects = TestBed.inject(HomeEffects);
    dataService = TestBed.inject(DataService);
  });

  it('should be created', async () => {
    expect(homeEffects).toBeTruthy();
  });

  it('should be called fetchBanners', (done: DoneFn) => {
    actions$ = of(homeAction.loadHomePageData);
    const spy = spyOn(dataService, 'getBanners').and.returnValue(
      of(mockBanners)
    );
    homeEffects.fetchBanners.subscribe((action) => {
      expect(action).toBeTruthy();
      done();
    });
  });

  it('should be catch In error fetchBanners', (done: DoneFn) => {
    actions$ = of(homeAction.loadHomePageData);
    const spy = spyOn(dataService, 'getBanners').and.returnValue(
      throwError({ error: { message: 'faild' } })
    );
    homeEffects.fetchBanners.subscribe((action) => {
      expect(action).toBeTruthy();
      done();
    });
  });
});
