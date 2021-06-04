import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoaderComponent } from './components/loader/loader.component';

import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component';
import { LoaderService } from './services/loader.service';
import { DataService } from './services/data.service';
import { MessageService } from './services/message.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
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
    PageNotFoundComponent
  ]
})
export class CoreModule { }
