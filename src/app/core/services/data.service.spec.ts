import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { mockCategories } from '../../shared/mocks/category.mock';
import { mockBanners } from '../../shared/mocks/banners.mock';
import { mockProducts } from '../../shared/mocks/products.mock';

describe('DataService', () => {
  let service: DataService;
  let httpClient:HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(DataService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCategoris method should return all categories', (done:DoneFn) => {
    const spy = spyOn(httpClient, 'get').and.returnValue(of(mockCategories));
    service.getCategories().subscribe((categories)=>{
      expect(categories.length).toEqual(mockCategories.length);
      done()
    })
  });

  it('getBanners method should return all Banners', (done:DoneFn) => {
    const spy = spyOn(httpClient, 'get').and.returnValue(of(mockBanners));
    service.getBanners().subscribe((banners)=>{
      expect(banners.length).toEqual(mockCategories.length);
      done()
    })
  });

  it('getProducts method should return all products', (done:DoneFn) => {
    const spy = spyOn(httpClient, 'get').and.returnValue(of(mockProducts));
    service.getProducts().subscribe((products)=>{
      expect(products.length).toEqual(mockProducts.length);
      done()
    })
  });

  it('getProducts method should return products by catID', (done:DoneFn) => {
    const spy = spyOn(httpClient, 'get').and.returnValue(of(mockProducts));
    service.getProducts('5b6899953d1a866534f516e2').subscribe((products)=>{
      expect(products[0].category).toEqual('5b6899953d1a866534f516e2');
      done()
    })
  });

  it('addToCart method should call', (done:DoneFn) => {
    const message ={
      "response": "Success",
      "responseMessage": "Product added to cart successfully"
    }
    const spy = spyOn(httpClient, 'get').and.returnValue(of(message));
    service.addToCart().subscribe((msg)=>{
      expect(msg.response).toEqual('Success');
      done()
    })
  });

  
  
});
