import { getCartItems } from '../../store/products.selectors';
import { Cart } from '../../../../shared/shared/models/cart';
import { Component, Injector, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store'
import * as cartActions from '../../store/products.action';
import { MessageService } from '../../../../core/services/message.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItem: Cart[] = [];
  isDesktop: boolean = false;
  constructor(
    private injector: Injector,
    private router: Router,
    private msgService: MessageService,
    private store:Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.isDesktop = window.screen.width > 768;
    this.store.select(getCartItems).subscribe(
      items => this.cartItem = items
    )
  }

  get total() {
    const reducer = (sum: number, cart: Cart) =>
      sum + cart.qty * cart.product.price;
    const initialValue = 0;
    return this.cartItem.reduce(reducer, initialValue);
  }

  onClose() {
    this.injector.get(MatDialogRef).close();
  }

  remove(index: number) {
    this.store.dispatch(cartActions.updateCartItem({index:index, action:'remove'}))
  }

  add(index: number) {
    this.store.dispatch(cartActions.updateCartItem({index:index, action:'add'}))
  }

  checkout() {
    if (this.isDesktop) this.onClose();
    this.msgService.show('Congratulation ! Your order is placed.');
    this.store.dispatch(cartActions.emptyCart())
    this.router.navigate(['/home']);
  }
}
