import { Banner } from '../../shared/shared/models/banner';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../shared/shared/models/category';
import { Product } from '../../shared/shared/models/product';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getCategories():Observable<Category[]> {
    return this.http.get<Category[]>(
      '/assets/server/categories/categories.json'
    );
  }

  getBanners():Observable<Banner[]>  {
    return this.http.get<Banner[]>('/assets/server/banners/banners.json');
  }

  getProducts(catID: string|null):Observable<Product[]>  {

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
  addToCart():Observable<{response:string, responseMessage:string}>{
    return this.http.get<{response:string, responseMessage:string}>('/assets/server/addToCart/addtocart.json');
  }
}
