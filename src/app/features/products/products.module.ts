import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
@NgModule({
  declarations: [
    ProductsComponent,
    SidebarComponent,
    ProductListComponent,
    CartComponent,
    ProductCardComponent,
  ],
  imports: [ProductsRoutingModule, SharedModule],
})
export class ProductsModule {}
