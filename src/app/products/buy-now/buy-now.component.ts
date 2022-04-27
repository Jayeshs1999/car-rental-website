import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrderDataService } from 'src/app/order-data.service';
import { OrderData } from '../order-data';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css']
})
export class BuyNowComponent implements OnInit {

  productId:Product
  buyNowForm:FormGroup
  productData:Product|any
  CashOnDelivery='Cash On Delivery'
  val:any
  constructor(private router:Router, private orderService:OrderDataService,private activatedRoute:ActivatedRoute,private productService:ProductService) {    

  }

  ngOnInit(): void {

   

    this.activatedRoute.params.subscribe(data=>{
      console.log("data",data)
      this.productId=data['id']
      console.log('product Id :',this.productId)
    });

    this.productService.viewProduct(this.productId).subscribe(viewData=>{
      this.productData=viewData;
      console.log("view product data :",viewData)
    })

  }
  buyNowFormSubmition(formData:any ){
   
    this.orderService.create(formData.value).then((result:any) => {
      console.log("inside component result :",result)
    }).catch((err:any) => {
      console.log(err)
    });

    formData.reset();

    alert("Congratulation!! order confirm successfully !!")
    this.router.navigate(['/products/products'])
    
    

  }

}
