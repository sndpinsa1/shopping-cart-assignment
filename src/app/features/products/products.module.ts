import { MatDialogModule } from '@angular/material/dialog';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared/shared.module';


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
    RouterModule.forChild(childRoutes),
    SharedModule
  ],
  exports:[RouterModule]
})
export class ProductsModule { }
