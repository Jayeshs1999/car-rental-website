import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Firestore } from '@angular/fire/firestore';

import { OrderData } from './products/order-data';


@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  private dbPath="/ordersData";
  orderRef:AngularFirestoreCollection<OrderData>;
  constructor(private db:AngularFirestore,) {
   
    this.orderRef=db.collection(this.dbPath)
    console.log("inside create service order ref :", this.orderRef)

   }

   create(orderData:any){
     console.log("inside create service :", orderData)
     return this.orderRef.add({...orderData})
   }

 



  
}
