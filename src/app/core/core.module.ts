import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoaderComponent } from './components/loader/loader.component';

import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component';
import { LoaderService } from './services/loader.service';
import { DataService } from './services/data.service';
import { MessageService } from './services/message.service';
import { SharedModule } from '../shared/shared.module';

const ALL_COMPONENTS = [
  PageNotFoundComponent,
  LoaderComponent,
  HeaderComponent,
  FooterComponent
]
@NgModule({
  declarations: [
    ...ALL_COMPONENTS
  ],
  imports: [
    SharedModule
  ],
  providers:[],
  exports:[
    ...ALL_COMPONENTS
  ]
})
export class CoreModule { }
