import * as fromAppEffects from './store/effects/app.effects';
import { CoreModule } from './core/core.module';
import { LoaderInterceptorService } from './core/intercepters/loader-interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/reducers/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HttpErrorHandlerInterceptorService } from './core/intercepters/http-error-handler-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot(fromAppEffects.ALL_EFFECTS),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
