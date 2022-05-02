import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  allCartItem:any
  cartItemLenght:any
  lenght:number=0;
  deleteNotClick=true
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    
    

    this.productService.viewAllCartItems().subscribe(data=>{
      this.allCartItem=data
      console.log("cart data:",this.allCartItem[1]['productImg'])
    })

  }
  

  deleteItemFromCart(id:any){
  
    this.productService.deleteCartItem(id).subscribe(data=>{
      console.log(data)
      alert("Item deleted from cart successfully")
      this.productService.notifyAboutChangeForDelete();
      this.ngOnInit()
      
    })
  }
}
