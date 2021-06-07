import { AppEffects } from './store/effects/app.effects';
import { CoreModule } from './core/core.module';
import { ProductEffects } from './features/products/store/products.effects';
import { LoaderInterceptorService } from './core/intercepters/loader-interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared/shared.module';

import { StoreModule } from '@ngrx/store';
import * as fromApp from './store';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './home/store/effects/home.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AppEffects, HomeEffects, ProductEffects])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
