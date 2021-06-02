import { CartService } from '../../../services/cart.service';
import { DataService } from './../../../common/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products:Product[]=[]
  constructor(
    private activatedRoute:ActivatedRoute,
    private dataService: DataService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>{
       this.dataService.getProducts(params.catid).subscribe(
         products=> this.products = products
       )
      }
    )
  }

  addToCart(product:Product){
    this.cartService.addToCart(product);
  }

}
