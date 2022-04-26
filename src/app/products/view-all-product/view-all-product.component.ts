import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-view-all-product',
  templateUrl: './view-all-product.component.html',
  styleUrls: ['./view-all-product.component.css']
})
export class ViewAllProductComponent implements OnInit {
  productList:any;
  constructor(private productService:ProductService,private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.productService.viewAllProduct().subscribe(data=>{
      this.productList=data
      console.log(this.productList[0]['productName'])
    })
  }

}
