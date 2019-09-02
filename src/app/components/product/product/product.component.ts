import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../../service/product.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NotificationService} from '../../../service/notification.service';
import {CategoryService} from '../../../service/category.service';
import {Product} from '../../../dto/product';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {Cart} from '../../../dto/cart';
import {CartService} from '../../../service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('quantity', {static: true}) quantity: ElementRef;
  @ViewChild('unitPrice', {static: true}) unitPrice: ElementRef;
  @ViewChild('total', {static: true}) total: ElementRef;
  @ViewChild('image', {static: true}) image: ElementRef;
  productAddedTocart: Product[];
  Total = 0;
  FullTotal = 0;
  cart: Cart = new Cart();

  @Input('app') app;

  public _contactForm: FormGroup;
  constructor(private _formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<ProductComponent>, private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any, private cartService: CartService, private productService: ProductService) {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  calcualtePrice() {
    alert('Hello');
    const qty = this.quantity.nativeElement.value;
    console.log(qty);
    const unitPrice = this.unitPrice.nativeElement.value;
    console.log('UnitPrice is:' + unitPrice);
    this.Total = qty * unitPrice;
    this.FullTotal = this.FullTotal + this.Total;
    const price = this.FullTotal;
    console.log('Fulltotal is:' + price);

  }
  onSubmit(): void {
   const cartLines = this.quantity.nativeElement.value;
   console.log('qty' + ' ' + cartLines);
   const grandTotal = this.total.nativeElement.value;
   console.log('subtotal' + ' ' + grandTotal);
   const imageUrl = this._contactForm.get('image').value;
   console.log(imageUrl);
   this.cart = new Cart(grandTotal, cartLines, imageUrl);
   console.log('cfg:' + cartLines);
   this.cartService.addtoCart(this.cart).subscribe(
  (result) => {
    console.log( result);
    alert('Item added Successfully');
  }
);

   // this.productAddedTocart = this.productService.getProductFromCart();
   // if (this.productAddedTocart == null) {
   //   this.productAddedTocart = [];
   //   this.p
   // }


  }

  ngOnInit() {
    this._contactForm = this._formBuilder.group({
      ID: [this.data.name],
      name: [ this.data.name, [Validators.required]],
      description: [ this.data.description, [Validators.required]],
      unitPrice: [ this.data.unitPrice, [Validators.required]],
      quantity: [ this.data.quantity , [Validators.required]],
      image: [this.data.imageUrl],
    });
    console.log(this._contactForm);
  }


}



