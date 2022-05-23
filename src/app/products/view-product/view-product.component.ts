import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toArray } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  productId=0;
  productData:Product|any;
  data:any

  
  constructor(private activateRoute:ActivatedRoute,private productService:ProductService,

    private router:Router) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(data=>{
      this.productId=data['id'];
      console.log("product id :",this.productId)
    })
     
    this.productService.viewProduct(this.productId).subscribe(viewData=>{
      this.productData=viewData;
      console.log("produjc :",this.productData)
    })

    this.productService.viewAllProduct().subscribe(data=>{
      this.data=data
      for (let value of this.data) {
        if(value.categoryId==this.productData.categoryId)
        console.log(value.categoryId)
      }
     
    })
  }
  addToCart(value:any){
    
    console.log("Product data :",value)
    this.productService.createCartItem(value).subscribe(data=>{
      console.log("data inside the addtocart :",data)
      alert("Item added to the cart successfully")
      this.productService.notifyAboutChange()
      
    })

  }
  refresh(){
    this.ngOnInit()
    window.scrollTo(0,0)
  }
}
