import { environment }  from './../../../environments/environment';
import { Banner } from '../../features/home/models/banner';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../shared/models/category';
import { Product } from '../../features/products/models/product';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({providedIn:'root'})
export class DataService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.AppApi.GET_CATEGORIES);
  }

  getBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>(environment.AppApi.GET_BANNERS);
  }

  getProducts(catID = ''): Observable<Product[]> {
    return this.http.get<Product[]>(environment.AppApi.GET_PRODUCTS).pipe(
      map((products) =>
        products.filter((product) => {
          if (catID) return product.category == catID;
          else return product;
        })
      )
    );
  }

  addToCart(): Observable<{ response: string; responseMessage: string }> {
    return this.http.get<{ response: string; responseMessage: string }>(
      environment.AppApi.ADD_TO_CART
    );
  }
}
