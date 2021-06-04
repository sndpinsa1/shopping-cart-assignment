import { User } from '../../../auth/models/user.model';
import { getCartItems } from '../../../features/products/store/products.selectors';
import { Cart } from '../../../shared/shared/models/cart';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store'
import * as AuthActions from '../../../auth/store/actions/auth.action';
import * as HomeActions from '../../../home/store/actions/home.action';
import { CartComponent } from 'src/app/features/products/components/cart/cart.component';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items:Cart[] = [];
  loggedInUser:User | null;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store:Store<fromApp.AppState>,
    private msgService: MessageService
  ) { }

  ngOnInit(): void {
    this.store.select(getCartItems).subscribe(
      items=>this.items = items
    )
    this.store.select('auth').subscribe(
      appState=> this.loggedInUser = appState.user
    )

    this.store.dispatch(HomeActions.loadHomePageData());
    this.store.dispatch(fromApp.fetchCategories());

  }

  onCartClick(){
    if(window.screen.width > 768){
      console.log("popup")
      this.dialog.open(
        CartComponent,
        {
          width: '280px',
          height:"70vh",
          position:{
            right: "150px",
            top:"95px"
          }
        }
      )
    }else{
      this.router.navigate(['/products/cart']);
    }
  }

  logout(){
    this.store.dispatch(AuthActions.logout());
    this.msgService.show("Logout Successfully !");
    this.router.navigate(['/home']);
    
  }
}
