import { Banner } from './../models/banner';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(
      '/assets/server/categories/categories.json'
    );
  }

  getBanners() {
    return this.http.get<Banner[]>('/assets/server/banners/banners.json');
  }

  getProducts(catID: string) {
    if (!catID) {
      return this.http.get<Product[]>(
        '/assets/server/products/products.json'
      );
    } else {
      return this.http
        .get<Product[]>('/assets/server/products/products.json')
        .pipe(
          map(
            products => products.filter(product=>{
              return product.category == catID
            })
          )
        );
    }
  }
}
