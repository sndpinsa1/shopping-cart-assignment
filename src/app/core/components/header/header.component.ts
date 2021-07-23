import { User } from '../../../auth/models/user.model';
import { Cart } from '../../../features/products/models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/reducers/app.reducer';
import * as AuthActions from '../../../auth/store/actions/auth.action';
import * as HomeActions from '../../../features/home/store/actions/home.action';
import * as SharedActions from '../../../shared/store/actions/shared.actions';
import { CartComponent } from 'src/app/features/products/components/cart/cart.component';
import { MessageService } from '../../services/message.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppGlbMessages } from '../../../shared/constants/app-glb-messages';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  items: Cart[] = [];
  loggedInUser: User;
  isDesktop: boolean = false;
  private notifier = new Subject();
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private msgService: MessageService
  ) {}

  ngOnInit(): void {
    // move all the dispatch part into separeted component put into the home component
    this.store.dispatch(HomeActions.loadHomePageData());
    this.store.dispatch(SharedActions.fetchCategories());
    this.isDesktop = window.screen.width > 768;
    this.store
      .select('products')
      .pipe(takeUntil(this.notifier))
      .subscribe((productState) => (this.items = productState.items));
    this.store
      .select('auth')
      .pipe(takeUntil(this.notifier))
      .subscribe((appState) => (this.loggedInUser = appState.user));
  }

  onCartClick(): void {
    if (this.isDesktop) {
      this.dialog.open(CartComponent, {
        width: '350px',
        height: '80vh',
        backdropClass: 'custom-overlay',
        position: {
          right: '150px',
          top: '95px',
        },
      });
    } else {
      this.router.navigate(['/products/cart']);
    }
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
    this.msgService.show(AppGlbMessages.LOGOUT_SUCCESS);
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
