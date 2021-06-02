import { Cart } from './../models/cart';
import { CartService } from '../services/cart.service';
import { CartComponent } from './../features/products/cart/cart.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items:Cart[] = []
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private cartService:CartService
  ) { }

  ngOnInit(): void {
    this.cartService.cartItems.subscribe(
      items =>{
        this.items = items
      }
    )
  }

  onCartClick(){
    if(window.screen.width > 768){
      console.log("popup")
      this.dialog.open(
        CartComponent,
        {
          width: '300px'
        }
      )
    }else{
      this.router.navigate(['/products/cart']);
    }
  }

}
