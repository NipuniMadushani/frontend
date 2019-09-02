import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {Product} from '../../../dto/product';

@Component({
  selector: 'app-productfilter',
  templateUrl: './productfilter.component.html',
  styleUrls: ['./productfilter.component.css']
})
export class ProductfilterComponent implements OnInit {
  // product: Product = new Product();
  @Input('product1') product1: Product;
  @Input('show-actions') showActions = true;
  productList: Array<Product> = [];
  constructor(private userService: UserService) { }


  ngOnInit() {
    this.getAll();
  }

  private getAll(): void {
    this.productList = new Array();
    this.userService.getAllProducts().subscribe(value => {
      console.log(value);
      this.productList = value;
      console.log(this.productList);
    });


  }
}
