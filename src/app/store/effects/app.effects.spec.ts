import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as sharedActions from '../../shared/store/actions/shared.actions';
import { AppEffects } from './app.effects';
import { DataService } from '../../core/services/data.service';
import { mockCategories } from '../../shared/mocks/category.mock';
let actions$ = new Observable<Action>();
let dataService: DataService;
let appEffect: AppEffects;
describe('App effect test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppEffects, provideMockActions(() => actions$)],
    });
    appEffect = TestBed.inject(AppEffects);
    dataService = TestBed.inject(DataService);
  });

  it('should be created', async () => {
    expect(appEffect).toBeTruthy();
  });

  it('should be called getCategories', (done: DoneFn) => {
    actions$ = of(sharedActions.fetchCategories);
    const spy = spyOn(dataService, 'getCategories').and.returnValue(
      of(mockCategories)
    );
    appEffect.fetchCategories.subscribe((action) => {
      expect(action).toBeTruthy();
      done();
    });
  });

  it('should be catch In error fetch Categories', (done: DoneFn) => {
    actions$ = of(sharedActions.fetchCategories);
    const spy = spyOn(dataService, 'getCategories').and.returnValue(
      throwError({ error: { message: 'faild' } })
    );
    appEffect.fetchCategories.subscribe((action) => {
      expect(action).toBeTruthy();
      done();
    });
  });
});
