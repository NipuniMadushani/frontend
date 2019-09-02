import { Injectable } from '@angular/core';
import {OrderDetails} from '../dto/order-details';
import {Product} from '../dto/product';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {


  constructor(private http: HttpClient) { }

  insertOrderDetails(order: OrderDetails): Observable<boolean> {
    console.log('Hello');
    console.log(order);
    return this.http.post<boolean>('http://localhost:8080/backend_springmvc_war_exploded/OrderDetail', order);
  }
}
