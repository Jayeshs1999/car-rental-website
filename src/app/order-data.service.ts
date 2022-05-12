import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Firestore } from '@angular/fire/firestore';

import { OrderData } from './products/order-data';


@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  private dbPath="/ordersData";
  private dbProductPath="/addProduct"
  orderRef:AngularFirestoreCollection<OrderData>;
  productRef:AngularFirestoreCollection<OrderData>;

  constructor(private db:AngularFirestore,) {
   
    this.orderRef=db.collection(this.dbPath)
    this.productRef=db.collection(this.dbProductPath)
    console.log("inside create service order ref :", this.orderRef)

   }

   create(orderData:any){
     console.log("inside create service :", orderData)
     return this.orderRef.add({...orderData})
   }

   addToFirebase(productData:any){
    console.log("inside create service :", productData)
    return this.productRef.add({...productData})
  }

  getData(){
    return this.db.collection('addProduct').snapshotChanges()
    }
  
}
