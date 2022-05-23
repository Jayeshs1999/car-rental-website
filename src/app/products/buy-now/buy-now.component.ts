import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { OrderDataService } from 'src/app/order-data.service';
import { OrderData } from '../order-data';
import { Product } from '../product';
import { ProductService } from '../product.service';
declare var Razorpay:any
@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css']
})
export class BuyNowComponent implements OnInit {

  textValueShowInDropDown=true
   moneyValueShowInDropDown=false;
  paymentHandler:any = null;
  invalidFormErrorMsg = false
  productId: Product
  buyNowForm: FormGroup
  productData: Product | any
  CashOnDelivery = 'Cash On Delivery'
  val: any
  constructor(private router: Router, private orderService: OrderDataService,
    private activatedRoute: ActivatedRoute, private productService: ProductService,
    private winRef: AuthService
    ) {
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      console.log("data", data)
      this.productId = data['id']
      console.log('product Id :', this.productId)
    });
    this.productService.viewProduct(this.productId).subscribe(viewData => {
      this.productData = viewData;
      console.log("view product data :", viewData)
    })
    this.invokeStripe();
    
  }
  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log({stripeToken})
        alert('Stripe token generated!');
      }
    });
    paymentHandler.open({
      name: 'FreakyJolly',
      description: 'Buying a Hot Coffee',
      amount: amount * 100
    });
  }

  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log("strip :",stripeToken)
           
            alert('Payment has been successfull!');
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }
  buyNowFormSubmition(formData: any) {

    if (!formData.valid) {
      this.invalidFormErrorMsg = true

      setTimeout(() => {
        this.invalidFormErrorMsg = false
      }, 3000);

      console.log("Invalid form")
      return
    }
    console.log("data submitted")
    this.orderService.create(formData.value).then((result: any) => {
      console.log("inside component result :", result)
    }).catch((err: any) => {
      console.log(err)
    });

    formData.reset();
    alert("Congratulation!! order confirm successfully !!")
    this.router.navigate(['/products/products'])
  }
  payWithRazor(price:any) {
    const options: any = {
      key: 'rzp_test_6uJFSY6NlYuRZw',
      amount: price, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'Welcome', // company name or product name
      description: 'Welcome to ProVIP',  
      image: 'http://localhost:4200/assets/oppo-a31.jpg', // company logo or product image
      // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response :any, error:any) => {
      options.response = response;
      console.log(response);
      console.log(options);
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }
}
