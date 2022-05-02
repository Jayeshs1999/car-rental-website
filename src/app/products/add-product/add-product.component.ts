import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    
  }

  addNewProduct(form :any){
    // console.log(form.value)
    // let image_name= form.value.file.toString().split("\'")
    // image_name=form.value.file.split("\\")
    // console.log(image_name[2])
    // let img_url='http://localhost:4200/assets/'
    // let appendedImgUrl=img_url.concat(image_name[2])
    // console.log(appendedImgUrl)

    let newProduct={
      id: form.value.product_id, 
    productName: form.value.product_name,
      categoryId: form.value.product_category,
      descriptions:form.value.product_discription,
      price:form.value.product_price,
      productImg:form.value.file,
      isAvailable:form.value.product_available,
      rating:form.value.product_rating,
      reviews:form.value.product_reviews,
      color:form.value.product_color,
    };
    console.log(newProduct);
    console.log("file nameL", form.value.file)

  
    this.productService.createProduct(newProduct).subscribe(data=>{
      console.log(data)
    })


    form.reset()
  }

}
