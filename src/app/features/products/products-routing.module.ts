import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const childRoutes: Routes = [
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: ProductListComponent,
      },
      {
        path: ':catid',
        component: ProductListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
