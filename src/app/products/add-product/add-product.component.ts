import { identifierName } from '@angular/compiler';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { resolve } from 'dns';
import { OrderDataService } from 'src/app/order-data.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public getData:any
  constructor(private productService:ProductService,private orderService:OrderDataService,private db:AngularFirestore) { }

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
      descriptions:form.value.product_description,
      price:form.value.product_price,
      productImg:"",
      isAvailable:form.value.product_available,
      rating:form.value.product_rating,
      reviews:form.value.product_reviews,
      color:form.value.product_color,
    };
    console.log(newProduct);
    console.log("file nameL", form.value.file)

    this.orderService.addToFirebase(newProduct).then(data=>{
      console.log("data added to firebase :",data)
    })    

    this.productService.createProduct(newProduct).subscribe(data=>{
      console.log(data)
    })


    form.reset()
  }

  // getFirebaseData(){
  //   this.orderService.getData().subscribe(res=>{
  //     this.getData=res
  //     for(let value of this.getData){
  //       console.log(value.payload.doc.data().productImg)
  //     } 
  //     console.log(res)}
  //     )
  // }
}


