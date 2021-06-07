import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoaderComponent } from './components/loader/loader.component';

import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component';
import { LoaderService } from './services/loader.service';
import { DataService } from './services/data.service';
import { MessageService } from './services/message.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers:[
    LoaderService,
    DataService,
    MessageService
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    PageNotFoundComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CoreModule { }
