import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() cart: number | undefined;
  @Output() addToCart: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() remove: EventEmitter<string> = new EventEmitter<string>();
  @Output() add: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onAdd(productId: string) {
    this.add.emit(productId);
  }

  onRemove(productId: string) {
    this.remove.emit(productId);
  }

  onAddToCart(product: Product) {
    this.addToCart.emit(product);
  }
}
