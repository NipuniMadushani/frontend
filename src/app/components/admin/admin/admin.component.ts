import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {Product} from '../../../dto/product';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {NgForm} from '@angular/forms';
import {ProductComponent} from '../../product/product/product.component';
import {ProductService} from '../../../service/product.service';
import {NotificationService} from '../../../service/notification.service';
import {Category} from '../../../dto/category';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  board: string;
  errorMessage: string;

  product: Product = new Product();
  category: Category = new Category();
  categoryList: Array<Category> = [];
  productList: Array<Product> = [];
  manually = false;


   productHeader = [{ name: 'Laptop' }, { name: 'Mobile'}, { name: 'Television' }];
  @ViewChild(MatSort, {static: true})sort: MatSort;
  @ViewChild('productForm', {static: true}) productForm: NgForm;
  @ViewChild('paginator', {static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'brand', 'price', 'category', 'qty' , 'imageUrl', 'actions', 'Edit'];

  searchKey: string;
  dataSource = new MatTableDataSource<Product>(this.productList);
  manuallySelected = true;
  tempProduct: Product = null;


  constructor(private userService: UserService, private productService: ProductService, private dialog: MatDialog,
              private notificationService: NotificationService ) {
    this.allProduct();

  }

  ngOnInit() {
    this.userService.getAdminBoard().subscribe(
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

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ProductComponent, dialogConfig);
  }


  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  updateSubmit(row) {
    this.productForm.form.get('id').setValue(row.id);
    this.productForm.form.get('name').setValue(row.name);
    this.productForm.form.get('description').setValue(row.description);
    this.productForm.form.get('unitPrice').setValue(row.unitPrice);
    this.productForm.form.get('quantity').setValue(row.quantity);
    this.productForm.form.get('imageUrl').setValue(row.imageUrl);
    this.productForm.form.get('categoryName').setValue(row.categoryName);
    this.productForm.form.get('brand').setValue(row.brand);
  }
  saveCustomer(): void {
    this.productService.insertEmployee(this.product).subscribe(
      (result) => {
        console.log(this.product);
        alert('Product Save Successfully');
        this.allProduct();
        // this.notificationService.success(':: Submitted successfully');
      }
    );
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
  onClear() {
    const index = this.productList.indexOf(this.product);
    if (index !== -1) {
      this.productList[index] = this.tempProduct;
      this.tempProduct = null;
    }
    this.product = new Product();
    this.manuallySelected = false;

  }

  updateProduct(): void {
    this.userService.updateProduct(this.product).subscribe((result) => {
      alert('Product Update Successfully');
      this.onClear();
      this.manually = true;
      this.allProduct();

    });

  }

  onDelete(id: number): void {
    if (confirm('Are you want to delete this Product?')) {
      console.log(id);
      this.userService.deletePoduct(id).subscribe(
        (result) => {
          alert('Product Delete Successfully');
          this.allProduct();
        }
      );
    }
  }
}
