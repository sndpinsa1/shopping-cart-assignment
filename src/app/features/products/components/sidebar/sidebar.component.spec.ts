import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { AppState } from '../../../../store/reducers/app.reducer';
import { MatModule } from '../../../../shared/mat.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mockCategories } from '../../../../shared/mocks/category.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { appState } from '../../../../shared/mocks/app-state.mock';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let store: MockStore;
  const initialState: AppState = appState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      providers: [provideMockStore({ initialState })],
      imports: [MatModule, BrowserAnimationsModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    component.categories = mockCategories;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be selectionCat on click onSelect', () => {
    component.onSelect('abc');
    expect(component.selectionCat).toEqual('abc');
  });

  it('should be selectionCat undefind', () => {
    store.setState({
      ...initialState,
      products: {
        selectedCategoryId: '',
      },
    });
    expect(component.selectionCat).toBeFalsy();
  });
});
