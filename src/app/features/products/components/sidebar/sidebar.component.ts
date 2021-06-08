import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/reducers/app.reducer';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() categories: Category[] = [];
  panelOpenState = false;
  selectionCat: string | undefined;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('products').subscribe((productState) => {
      let cat = this.categories.find(
        (cat) => cat.id === productState.selectedCategoryId
      );
      this.selectionCat = cat?.name;
    });
  }

  onSelect(catName: string): void {
    this.selectionCat = catName;
  }
}
