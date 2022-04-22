import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) {
   }
   createProduct(productBody:any){
     const baseUrl="http://localhost:3000/product";
     return this.httpClient.post(baseUrl,productBody);
  }

  updateProduct(productId:any,productBody:any){
    const baseUrl="http://localhost:3000/product/"+productId;
    return this.httpClient.put(baseUrl,productId);
 }
 viewProduct(productId:any){
  const baseUrl="http://localhost:3000/product/"+productId;
  return this.httpClient.get(baseUrl);
}
deleteProduct(productId:any){
  const baseUrl="http://localhost:3000/product/"+productId;
  return this.httpClient.delete(baseUrl);
}
searchCategoryProduct(categoryId:any){
  const baseUrl="http://localhost:3000/product/category="+categoryId;
  return this.httpClient.get(baseUrl);
}

searchDateProduct(dateParams:any){
  const baseUrl="http://localhost:3000/product/date="+dateParams;
  return this.httpClient.delete(baseUrl);
}
}
