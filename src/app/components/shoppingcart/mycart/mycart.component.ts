import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../../service/product.service';
import {CartService} from '../../../service/cart.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Cart} from '../../../dto/cart';
import {Product} from '../../../dto/product';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {
  allCount: number;
  allTotal: number;
  cartList: Array<Cart> = [];
  cart: Cart = new Cart();
  productAddedTocart: Cart[];
  product: Array<Product> = [];
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'image', 'quantity', 'total' , 'delete'];
  // dataSource = ELEMENT_DATA;

  dataSource = new MatTableDataSource<Cart>(this.cartList);

  constructor(private productService: ProductService, private cartService: CartService, private router: Router) {
    this.getAllItem();
  }

  ngOnInit() {
    // this.calculteAllTotal(this.cartList);

  }


  calculteAllTotal(allItems: Cart[]) {

    // console.log('all item' + allItems);
    let total = 0;
    console.log(allItems);
    for (const i in allItems) {
      total = total + (allItems[i].grandTotal );
    }
    this.allTotal = total;
  }
  onDelete(id: number): void {
    if (confirm('Do you want to remove this item?')) {
      console.log(id);
      this.cartService.deleteCartItem(id).subscribe(
        (result) => {
          alert('Product Remove Successfully');
          this.getAllItem();
        }
      );
    }
  }


  private getAllItem() {
    this.cartList = new Array();
    this.cartService.getAllItem().subscribe(value => {
      console.log(value);
      this.cartList = value;
      console.log(this.cartList);
      this.calculteAllTotal(this.cartList);
      this.totalItemsCount(this.cartList);
      this.dataSource.data = this.cartList;
      this.paginator.length = this.cartList.length;
    });
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
      count = count + (cartList[i].cartLines );
    }
    this.allCount = count;

  }
}

