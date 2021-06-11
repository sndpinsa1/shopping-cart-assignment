import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { DataService } from '../../../../core/services/data.service';
import { ProductEffects } from './products.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockProducts } from '../../../../shared/mocks/products.mock';
import * as productActions from '../actions/products.action';
let actions$ = new Observable<Action>();
let dataService: DataService;
let productEffect: ProductEffects;
describe('Product effect test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductEffects, provideMockActions(() => actions$)],
    });
    productEffect = TestBed.inject(ProductEffects);
    dataService = TestBed.inject(DataService);
  });

  it('should be created', async () => {
    expect(productEffect).toBeTruthy();
  });

  it('should be called loadProducts', (done: DoneFn) => {
    actions$ = of(productActions.loadProducts);
    const spy = spyOn(dataService, 'getProducts').and.returnValue(
      of(mockProducts)
    );
    productEffect.loadProducts.subscribe((action) => {
      expect(action).toBeTruthy();
      done();
    });
  });

  it('should be catch In error loadProducts', (done: DoneFn) => {
    actions$ = of(productActions.loadProducts);
    const spy = spyOn(dataService, 'getProducts').and.returnValue(
      throwError({ error: { message: 'faild' } })
    );
    productEffect.loadProducts.subscribe((action) => {
      expect(action).toBeTruthy();
      done();
    });
  });
});
