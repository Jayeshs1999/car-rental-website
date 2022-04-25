import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/site-layout/category';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-view-product-by-category',
  templateUrl: './view-product-by-category.component.html',
  styleUrls: ['./view-product-by-category.component.css']
})
export class ViewProductByCategoryComponent implements OnInit {
  searchCategory:Category
  productList:any
  noItemFound=false
  constructor(private activeRoute:ActivatedRoute,private productSerivce:ProductService,private router:Router) {
    console.log("hello")
   }

  ngOnInit(): void {
   
    this.activeRoute.params.subscribe(data=>{
      console.log("data",data)
      this.searchCategory=data['id']
      console.log("searchCategory :",this.searchCategory)

      this.productSerivce.searchCategoryProduct(this.searchCategory).subscribe(categoryData=>{
        this.productList=categoryData
        console.log("product list",this.productList)

        if(this.productList.length==0){
          this.noItemFound=true
        }
      })
    })
  }

  onProductClick(id:any){
    console.log(id)
    // routerLink="view-product/{{productList[index].id}}"
    // this.router.navigate(['products/products/view-product'], { queryParams: id });

  }

}
