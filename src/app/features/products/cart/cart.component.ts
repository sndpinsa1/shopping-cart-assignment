import { Cart } from './../../../models/cart';
import { CartService } from '../../../services/cart.service';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItem:Cart[] = [];
  isDesktop:boolean = false;
  constructor(
    private injector: Injector,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartService.cartItems.subscribe(
      items =>{
        this.cartItem = items;
      }
    )
    this.isDesktop = window.screen.width > 768;
  }

  get total(){
    const reducer = (sum:number, cart:Cart) => sum + (cart.qty * cart.product.price);
    const initialValue = 0;
    return this.cartItem.reduce(reducer, initialValue);
  }

  onClose(){
    this.injector.get(MatDialogRef).close();
  }

}
