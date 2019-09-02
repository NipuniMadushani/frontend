import {Injectable, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product} from '../dto/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  @ViewChild('productForm', {static: true}) productForm: NgForm;

  private currentCartCount = new BehaviorSubject(0);
  currentMessage = this.currentCartCount.asObservable();
  product: Product = new Product();
  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    brand: new FormControl(''),
    description: new FormControl(''),
    unitPrice: new FormControl(''),
    quantity: new FormControl(''),
    imageUrl: new FormControl(''),
    categoryName: new FormControl(''),
  });

  initializeFormGroup() {
    this.form.setValue({
      // $key: null,
      // id: '',
      name: '',
     brand: '',
      description: '',
      unitPrice: '',
      quantity: '' ,
      imageUrl: '',
     categoryName: '',
    });
  }

  insertEmployee(product: Product): Observable<boolean> {
    // console.log('Hllo');
    return this.http.post<boolean>('http://localhost:8080/backend_springmvc_war_exploded/Product', product);
  }

  populateForm(element) {
    console.log(element);
    this.productForm.form.get('name').setValue(element.name);

  }

  getProductFromCart() {
    return JSON.parse(localStorage.getItem('product'));
  }

  updateCartCount(cartItemCount: number) {

    this.currentCartCount.next(cartItemCount);

  }

  addProductToCart(productAddedTocart: any) {
    console.log( productAddedTocart);
    localStorage.setItem('product', JSON.stringify(productAddedTocart));

  }

  removeAllProductFromCart() {

  }
}
