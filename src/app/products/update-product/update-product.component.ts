import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  productId=0;
  productDetails:Product
  constructor(private activateRoute:ActivatedRoute,private productService:ProductService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(data=>{
      this.productId=data['id'];

      this.productService.viewProduct(this.productId).subscribe(productData=>{
        this.productDetails=productData
        console.log("Product details :",this.productDetails)
      })
    })
  }
  updateProduct(form:any){
    let updateProduct={
      
      productName: form.value.product_name,
      categoryId: form.value.product_category,
      descriptions:form.value.product_description,
      price:form.value.product_price,
      productImg:"",
      isAvailable:form.value.product_available,
      rating:form.value.product_rating,
      reviews:form.value.product_reviews,
      color:form.value.product_color,

    };
    console.log("update product",updateProduct)
    console.log("product id : ",this.productId)
    console.log(form)
    this.productService.updateProduct(this.productId,updateProduct).subscribe(data=>{
      console.log("data:",data)
    })
    form.reset()
  }
}
