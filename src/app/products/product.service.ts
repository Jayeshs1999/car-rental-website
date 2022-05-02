import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Category } from '../site-layout/category';
import {Product} from './product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartLenght=0

  eventEmitterNotifier: EventEmitter<null> = new EventEmitter();
  subjectNotifier: Subject<null> = new Subject<null>();

  constructor(private httpClient:HttpClient) {}

  // notifyAboutChange() {
  //   this.subjectNotifier.next;
  // }

  notifyAboutChange() {
    this.eventEmitterNotifier.emit();
  }
  notifyAboutChangeForDelete() {
    this.subjectNotifier.next(null);
  }
   createProduct(productBody:any) :Observable<Product>{
     const baseUrl="http://localhost:3000/product";
     return this.httpClient.post<Product>(baseUrl,productBody);
  }

  updateProduct(productId:any,productBody:any):Observable<Product>{
    const baseUrl="http://localhost:3000/product/"+productId;
    return this.httpClient.put<Product>(baseUrl,productBody);
 }
 viewAllProduct():Observable<Product>{
  const baseUrl="http://localhost:3000/product";
  return this.httpClient.get<Product>(baseUrl);
}
viewProduct(categoryId:any):Observable<Product>{
  const baseUrl="http://localhost:3000/product/"+categoryId;
  return this.httpClient.get<Product>(baseUrl);
}
deleteProduct(productId:any):Observable<Product>{
  const baseUrl="http://localhost:3000/product/"+productId;
  return this.httpClient.delete<Product>(baseUrl);
}
searchCategoryProduct(categoryId:any):Observable<Product>{
  const baseUrl="http://localhost:3000/product?categoryId="+categoryId;
  return this.httpClient.get<Product>(baseUrl);
}

searchDateProduct(dateParams:any):Observable<Product>{
  const baseUrl="http://localhost:3000/product/date="+dateParams;
  return this.httpClient.delete<Product>(baseUrl);
}

getCategory(): Observable<Category>{
  const categoryUrl="http://localhost:3000/categories";
  return this.httpClient.get<Category>(categoryUrl)
}

//-----------------------------------cart service -------------------------------------------------

createCartItem(cartBody:any) :Observable<Product>{
  const baseUrl="http://localhost:3000/addToCart";
  return this.httpClient.post<Product>(baseUrl,cartBody);
}

viewAllCartItems():Observable<Product>{

  const baseUrl="http://localhost:3000/addToCart";
  return this.httpClient.get<Product>(baseUrl);
}

deleteCartItem(itemId:any):Observable<Product>{
  const baseUrl="http://localhost:3000/addToCart/"+itemId;
  return this.httpClient.delete<Product>(baseUrl);
}


}
