import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../dto/product';
import {Category} from '../dto/category';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private  http: HttpClient) { }

  getAllCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>('http://localhost:8080/backend_springmvc_war_exploded/Category');

  }
}
