import { map } from 'rxjs/operators';
import { getCartItems } from '../../store/products.selectors';
import { Cart } from '../../../../shared/shared/models/cart';
import { DataService } from '../../../../core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/shared/models/product';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store'
import * as ProductActions from '../../store/products.action';
import { MessageService } from '../../../../core/services/message.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  cartItems: Cart[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private store: Store<fromApp.AppState>,
    private msgService: MessageService
  ) {}



  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.store.dispatch(ProductActions.loadProducts({id:params['catid']}))
    });

    this.store.select('products').subscribe(productState=>{
      if(productState.errorMsg){
        this.msgService.show(productState.errorMsg);
      }
      this.products = productState.products;
    })

    this.store
      .select(getCartItems)
      .subscribe((items) => (this.cartItems = items));
  }

  addToCart(product: Product) {
    let findIndex = this.cartItems.findIndex(
      (item) => item.product.id === product.id
    );
    if (findIndex == -1) {
      this.dataService.addToCart().subscribe((response: any) => {
        if (response.response == 'Success') {
          let item: Cart = { qty: 1, product: product };
          this.store.dispatch(ProductActions.addToCart({ cart: item }));
          this.msgService.show(response.responseMessage);
        }
      });
    }else{
      this.msgService.show('Item already into the cart!');
    }
  }
}
