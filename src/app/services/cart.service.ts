import { Cart } from './../models/cart';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartArray:Cart[] = [];
  cartItem = new BehaviorSubject<Cart[]>([]);
  cartItems = this.cartItem.asObservable();
  constructor() { }

  addToCart(item:Product){
    let existedItem = this.cartArray.find(element =>{
      return element.product.id == item.id
    })
    if(existedItem){
      existedItem.qty++;
    }else{
      this.cartArray.push({product:item, qty:1})
    }
    this.cartItem.next(this.cartArray)
  }



}
