import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  productId=0
  constructor(private activateRoute:ActivatedRoute,private productServices:ProductService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(data=>{
      this.productId=data['id']

      this.productServices.deleteProduct(this.productId).subscribe(deletedData=>{
        console.log("Product has been deleted :",data)
      })

    });

  }

}
