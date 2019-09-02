import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Cart} from '../../../dto/cart';
import {Product} from '../../../dto/product';
import {CartService} from '../../../service/cart.service';
import {MycartComponent} from '../../shoppingcart/mycart/mycart.component';
import {AppComponent} from '../../../app.component';
import {TokenStorageService} from '../../../service/token-storage.service';
import {UserService} from '../../../service/user.service';
import {SignUpInfo} from '../../../dto/signup-info';
import {MatTableDataSource} from '@angular/material';
import {OrderDetailsService} from '../../../service/order-details.service';
import {FormGroup} from '@angular/forms';
import {OrderDetails} from '../../../dto/order-details';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  info: any;
  image: any;
  allCount: number;
  allTotal: number;
  cartList: Array<Cart> = [];
  cartList1: Array<Cart> = [];
  cart: Cart = new Cart();
  displayedColumns: string[] = ['imageUrl'];

  searchKey: string;
  dataSource = new MatTableDataSource<Cart>(this.cartList1);
  @ViewChild('name', {static: true}) name: ElementRef;
  @ViewChild('date', {static: true}) date: ElementRef;
  @ViewChild('total', {static: true}) total: ElementRef;
  @ViewChild('qty', {static: true}) qty: ElementRef;
  shipping = {};
  serchedItems: SignUpInfo = new SignUpInfo('', '', '', '', '');
  mydate = Date.now();

  order: OrderDetails = new OrderDetails();

  @ViewChild('myaddress', {static: true}) myaddress: ElementRef;

  constructor(private cartService: CartService, private token: TokenStorageService, private userService: UserService,
              private orderService: OrderDetailsService) {
    this.getAllItem();
  }

  searchItems(): void {
    this.userService.searchItem(this.name.nativeElement.value).subscribe(
      (result) => {
        this.serchedItems = result;
        console.log(this.serchedItems);
        this.myaddress.nativeElement.focus();
        // this.qty1.nativeElement.focus();

      }
    );

  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),

    };
  }

  private clearCart(cartList: Cart[]) {
    console.log(cartList);
    for (const all of this.cartList) {
      this.cartService.deleteAllItem(all.id).subscribe(
        (result) => {
          console.log(result);
          this.getAllItem();
        }
      );

    }
    alert('Cart Clear Successfully');
  }

  private totalItemsCount(cartList: Array<Cart>) {
    let count = 0;
    for (const i in cartList) {
      count = count + (cartList[i].cartLines);
    }
    this.allCount = count;

  }

  calculteAllTotal(allItems: Cart[]) {

    // console.log('all item' + allItems);
    let total = 0;
    console.log(allItems);
    for (const i in allItems) {
      total = total + (allItems[i].grandTotal);
    }
    this.allTotal = total;

    let url;
    for (const i in allItems) {
      url =  (allItems[i].imageUrl);
    }
    this.image = url;
  }

  private getAllItem() {
    this.cartList = new Array();
    this.cartService.getAllItem().subscribe(value => {

      console.log(value);
      this.cartList = value;
      this.calculteAllTotal(this.cartList);
      this.totalItemsCount(this.cartList);
    });
  }



   addOrderDetails() {
    const address = this.myaddress.nativeElement.value;
    console.log(address);
    const orderDate = this.date.nativeElement.value;
    console.log(orderDate);
    const orderTotal = this.total.nativeElement.value;
    console.log(orderTotal);
    const orderCount = this.qty.nativeElement.value;
    console.log(orderCount);
    console.log(this.image);


    this.order = new OrderDetails(orderTotal,  orderCount,  orderDate, address,this.image);
    this.orderService.insertOrderDetails(this.order).subscribe(
      (result) => {
    console.log(result);
    alert('Order Added Successfully');
    // this.allProduct();
    // this.notificationService.success(':: Submitted successfully');
     }
      );
     }
  }

