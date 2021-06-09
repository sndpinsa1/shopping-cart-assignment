import { Cart } from '../../models/product';
import {
  Component,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/reducers/app.reducer';
import * as cartActions from '../../store/actions/products.action';
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
  loggedInUser: User = {email:'', password:''};
  @ViewChild('loginPopup') loginPopup: TemplateRef<any>;
  matDialogRef: MatDialogRef<TemplateRef<any>>;
  private notifier = new Subject();
  constructor(
    private injector: Injector,
    private router: Router,
    private msgService: MessageService,
    private store: Store<fromApp.AppState>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isDesktop = window.screen.width > 768;
    this.store
      .select('products')
      .pipe(takeUntil(this.notifier))
      .subscribe((productState) => {
        this.cartItem = productState.items;
      });

    this.store
      .select('auth')
      .pipe(takeUntil(this.notifier))
      .subscribe((authState) => {
        this.loggedInUser = authState.user;
      });
  }

  get total(): number {
    const reducer = (sum: number, cart: Cart) =>
      sum + cart.qty * cart.product.price;
    const initialValue = 0;
    return this.cartItem.reduce(reducer, initialValue);
  }

  onClose(): void {
    this.injector.get(MatDialogRef).close();
  }

  remove(index: number): void {
    this.store.dispatch(
      cartActions.updateCartItem({ index, action: 'remove' })
    );
  }

  add(index: number): void {
    this.store.dispatch(
      cartActions.updateCartItem({ index, action: 'add' })
    );
  }

  checkout(): void {
    if (!this.loggedInUser.email) {
      this.matDialogRef = this.dialog.open(this.loginPopup, {
        width: '300px',
      });
    } else {
      if (this.isDesktop) this.onClose();
      this.msgService.show('Congratulation ! Your order is placed.');
      this.store.dispatch(cartActions.emptyCart());
      this.router.navigate(['/home']);
    }
  }

  ok(): void {
    if (this.isDesktop) this.onClose();
    this.router.navigate(['/auth/login']);
    this.matDialogRef.close();
  }

  cancel(): void {
    this.matDialogRef.close();
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
