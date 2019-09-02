import {ElementRef, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from '../dto/product';
import {JwtResponse} from '../dto/jwt-response';
import {SignUpInfo} from '../dto/signup-info';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8097/api/test/user';
  private pmUrl = 'http://localhost:8097/api/test/pm';
  private adminUrl = 'http://localhost:8097/api/test/admin';

  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }

  getAllProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>('http://localhost:8080/backend_springmvc_war_exploded/Product');

  }

  deletePoduct(id: number): Observable<boolean> {
    console.log(id);
    return this.http.delete<boolean>('http://localhost:8080/backend_springmvc_war_exploded/Product/' + id);
  }


  updateProduct(product: Product): Observable<boolean> {
    return this.http.put<boolean>('http://localhost:8080/backend_springmvc_war_exploded/Product/' , product);

  }

  // searchItem(username: string): Observable<SignUpInfo> {
  //   console.log('hai');
  //   return this.http.get<SignUpInfo>('http://localhost:8080/backend_springmvc_war_exploded/user/' + username);
  //
  // }
  searchItem(name: ElementRef): Observable<SignUpInfo>  {
    console.log('Hai');
    return this.http.get<SignUpInfo>('http://localhost:8080/backend_springmvc_war_exploded/user/' + name);
  }
}

