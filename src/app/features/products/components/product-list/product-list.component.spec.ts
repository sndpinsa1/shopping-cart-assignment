import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { StoreModule } from '@ngrx/store';
import { appReducer, AppState } from '../../../../store/reducers/app.reducer';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from '../../../../core/services/message.service';
import { DataService } from '../../../../core/services/data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../../shared/shared.module';
import { Product } from '../../models/product';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { appState } from '../../../../shared/mocks/app-state.mock';
import { of } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let dataService: DataService;
  let store: MockStore;
  let messageService: MessageService;
  const initialState: AppState = appState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [
        StoreModule.forRoot(appReducer),
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [
        MessageService,
        DataService,
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    store = TestBed.inject(MockStore);
    messageService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call when item already into the cart', () => {
    const product: Product = {
      name: 'Epigamia Greek Yogurt - Strawberry, 90 gm',
      imageURL:
        'assets/static/images/products/bakery-cakes-dairy/yogurt-red.jpg',
      description: 'Low Fat and High protein delicious and thick Greek Yogurt.',
      price: 40,
      stock: 50,
      category: '5b6899123d1a866534f516de',
      sku: 'bcd-yogurt-red',
      id: '5b6c6dd701a7c3842953088b',
    };
    const spy1 = spyOn(messageService, 'error');

    component.addToCart(product);
    expect(spy1).toHaveBeenCalled();
  });

  it('should be call when new item add (addToCard Method)', () => {
    component.cartItems = [];
    const product: Product = {
      name: 'Bournvita Pro-Health Drink - Chocolate, 2x750 gm',
      imageURL: 'assets/static/images/products/beverages/bournvita.jpg',
      description:
        'Cadbury Bournvita is a delicious chocolate health drink which is enriched with Vitamin (D,B2,B9,B12). It combines the great taste of chocolate, and goodness of essential nutrients that aid growth and development.',
      price: 572,
      stock: 50,
      category: '5b675e5e5936635728f9fc30',
      sku: 'bev-bournvita-750',
      id: '5b6c6fbf01a7c3842953088e',
    };
    const spy1 = spyOn(messageService, 'show');
    const spy2 = spyOn(store, 'dispatch');
    const spy = spyOn(dataService, 'addToCart').and.returnValue(
      of({ response: 'Success', responseMessage: 'item add to card' })
    );
    component.addToCart(product);

    dataService.addToCart().subscribe((resp) => {
      expect(resp.response).toEqual('Success');
      expect(spy1).toHaveBeenCalled();

      expect(spy2).toHaveBeenCalled();
    });
  });
});
