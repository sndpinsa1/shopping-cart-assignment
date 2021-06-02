import { MatDialogModule } from '@angular/material/dialog';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import {MatIconModule} from '@angular/material/icon';


const childRoutes:Routes = [
  {
    path:'cart',
    component:CartComponent
  },
  {
      path:'',
      component:ProductsComponent,
      children: [
        {
          path:'',
          component:ProductListComponent
        },
        {
          path:':catid',
          component:ProductListComponent
        }
      ]
  }
]


@NgModule({
  declarations: [
    ProductsComponent,
    SidebarComponent,
    ProductListComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(childRoutes),
    MatDialogModule
  ],
  exports:[RouterModule]
})
export class ProductsModule { }
