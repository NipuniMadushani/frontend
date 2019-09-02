
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {Product} from '../../../dto/product';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {NgForm} from '@angular/forms';
import {ProductComponent} from '../../product/product/product.component';
import {ProductService} from '../../../service/product.service';
import {IAlert} from '../../../dto/ialert';
import {CartService} from '../../../service/cart.service';
import {Cart} from '../../../dto/cart';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  board: string;
  errorMessage: string;
  isPopupOpened = true;
  product: Product = new Product();
  cart: Cart = new Cart();
 productList: Array<Product> = [];
  productAddedTocart: Product[];
  manually = false;
  searchKey: string;
  cartItemCount = 0;
  public alerts: Array<IAlert> = [];
  // @Input('product1') product1;

  @ViewChild(MatSort, {static: true})sort: MatSort;
  @ViewChild('productForm', {static: true}) customerForm: NgForm;
  @ViewChild('paginator', {static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'image', 'name', 'brand', 'unitPrice', 'category', 'qty', 'Edit' ];
  // dataSource = ELEMENT_DATA;

  dataSource = new MatTableDataSource<Product>(this.productList);
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }


  // @ts-ignore
  constructor(private userService: UserService, private dialog?: MatDialog, private productService: ProductService) {
    this.allProduct();
  }

  ngOnInit() {
    this.userService.getUserBoard().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  updateSubmit(element) {
    console.log(element);
    this.isPopupOpened = true;

    const dialogRef = this.dialog.open(ProductComponent, {
      data: element,
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });

  }



  allProduct(): void {
    this.productList = new Array();
    this.userService.getAllProducts().subscribe(value => {
      console.log(value);
      this.productList = value;
      console.log(this.productList);
      this.dataSource.data = this.productList;
      this.paginator.length = this.productList.length;
    });
  }

  private closeAlert(alerts: any) {
const  index: number = this.alerts.indexOf(alerts);
this.alerts.splice(index, 1);

  }
}

