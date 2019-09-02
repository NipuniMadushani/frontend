import { Injectable } from '@angular/core';
import {Cart} from '../dto/cart';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../dto/product';
import {async} from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addtoCart(cart: Cart): Observable<boolean> {
    console.log(Cart);
    console.log(cart);
    return this.http.post<boolean>('http://localhost:8080/backend_springmvc_war_exploded/user/addCart', cart);
  }


  getAllItem() {
    return this.http.get<Array<Product>>('http://localhost:8080/backend_springmvc_war_exploded/user/getCart');
  }

  deleteCartItem(id: number): Observable<boolean> {
    return this.http.delete<boolean>('http://localhost:8080/backend_springmvc_war_exploded/user/' + id);

  }

  // deleteAllItem(cartList: Cart[]): Observable<Array<Cart>> {
  //   return this.http.delete<Array<Cart>>('http://localhost:8080/backend_springmvc_war_exploded/cart/'  , );
  // }
  deleteAllItem(id: number) {
    return this.http.delete<boolean>('http://localhost:8080/backend_springmvc_war_exploded/user/' + id);  }

  getAllShoppingCartDetails(): Observable<Array<Cart>> {
    return this.http.get<Array<Cart>>('http://localhost:8080/backend_springmvc_war_exploded/user/getCart');
  }
}
