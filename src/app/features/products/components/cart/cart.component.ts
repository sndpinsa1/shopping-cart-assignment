import { getCartItems } from '../../store/products.selectors';
import { Cart } from '../../../../shared/shared/models/cart';
import { Component, Injector, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store'
import * as cartActions from '../../store/products.action';
import { MessageService } from '../../../../core/services/message.service';
import { User } from '../../../../auth/models/user.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItem: Cart[] = [];
  isDesktop: boolean = false;
  loggedInUser:User | null;
  @ViewChild('loginPopup') loginPopup: TemplateRef<any>;
  matDialogRef:MatDialogRef<any>;
  notifier = new Subject();
  constructor(
    private injector: Injector,
    private router: Router,
    private msgService: MessageService,
    private store:Store<fromApp.AppState>,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.isDesktop = window.screen.width > 768;
    this.store.select(getCartItems)
    .pipe(takeUntil(this.notifier))
    .subscribe(
      items => this.cartItem = items
    )

    this.store.select('auth')
    .pipe(takeUntil(this.notifier))
    .subscribe(
      authState=>{
        this.loggedInUser = authState.user;
      }
    )
  }

  get total():number {
    const reducer = (sum: number, cart: Cart) =>
      sum + cart.qty * cart.product.price;
    const initialValue = 0;
    return this.cartItem.reduce(reducer, initialValue);
  }

  onClose():void {
    this.injector.get(MatDialogRef).close();
  }

  remove(index: number):void {
    this.store.dispatch(cartActions.updateCartItem({index:index, action:'remove'}))
  }

  add(index: number):void {
    this.store.dispatch(cartActions.updateCartItem({index:index, action:'add'}))
  }

  checkout():void {
    if(!this.loggedInUser){
      this.matDialogRef = this.dialog.open(this.loginPopup,{
        width: "300px"
      });
    }else{
      if (this.isDesktop) this.onClose();
      this.msgService.show('Congratulation ! Your order is placed.');
      this.store.dispatch(cartActions.emptyCart())
      this.router.navigate(['/home']);
    }
  }

  ok():void {
    if (this.isDesktop) this.onClose();
    this.router.navigate(['/auth/login']);
    this.matDialogRef.close();
  }

  cancel():void{
    this.matDialogRef.close();
  }

  ngOnDestroy():void{
    this.notifier.next();
    this.notifier.complete();
  }
  
}
