import { map, takeUntil } from 'rxjs/operators';
import { DataService } from '../../../../core/services/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Cart } from 'src/app/features/products/models/product';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/reducers/app.reducer';
import * as ProductActions from '../../store/actions/products.action';
import * as cartActions from '../../store/actions/products.action';
import { MessageService } from '../../../../core/services/message.service';
import { Subject } from 'rxjs';
import { AppGlbMessages } from '../../../../shared/constants/app-glb-messages';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  cartItems: Cart[] = [];
  private notifier = new Subject();
  cartMap: Map<string, number> = new Map();
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private store: Store<fromApp.AppState>,
    private msgService: MessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.store.dispatch(ProductActions.loadProducts({ id: params['catid'] }));
    });

    this.store
      .select('products')
      .pipe(takeUntil(this.notifier))
      .subscribe((productState) => (this.products = productState.products));

    this.store
      .select('products')
      .pipe(takeUntil(this.notifier))
      .subscribe((productState) => {
        this.cartItems = productState.items;
        this.cartMap.clear();
        productState.items.forEach((cart) => {
          this.cartMap.set(cart.product.id, cart.qty);
        });
      });
  }

  addToCart(product: Product): void {
    this.dataService.addToCart().subscribe((response: any) => {
      if (response.response == 'Success') {
        let item: Cart = { qty: 1, product };
        this.store.dispatch(ProductActions.addToCart({ cart: item }));
        this.msgService.show(response.responseMessage);
      }
    });
  }

  remove(productId: string): void {
    this.store.dispatch(
      cartActions.updateCartItem({ productId, action: 'remove' })
    );
  }

  add(productId: string): void {
    this.store.dispatch(
      cartActions.updateCartItem({ productId, action: 'add' })
    );
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
