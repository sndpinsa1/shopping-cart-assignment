import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from '../../../../store/reducers/app.reducer';
import { MatModule } from '../../../../shared/mat.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mockCategories } from '../../../../shared/mocks/category.mock';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      imports: [
        StoreModule.forRoot(appReducer),
        MatModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    component.categories = mockCategories;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be selectionCat on click onSelect', () => {
    component.onSelect('abc');
    expect(component.selectionCat).toEqual('abc');
  });


});
