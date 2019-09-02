import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from './service/token-storage.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {Cart} from './dto/cart';
import {CartService} from './service/cart.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  info: any;
  private roles: string[];
  private authority: string;
  allCount: number;
  cartList: Array<Cart> = [];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  small = false;
  private today: number;

  constructor(private tokenStorage: TokenStorageService, private breakpointObserver: BreakpointObserver, private router: Router, private cartService: CartService) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.small = true;
          console.log(
            'Matches small viewport or handset in portrait mode'
          );
        } else {
          this.small = false;
        }
      });

    // this.today = Date.now();
    this.today = new Date().getTime();
    this.getAllItem();
    // fixedTimezone = this.today;
  }
  logout() {
    this.tokenStorage.signOut();
    if (this.router.url === '/user') {
      return this.router.navigate(['/home']);

    }
  }
  ngOnInit() {
    this.info = {
      token: this.tokenStorage.getToken(),
      username: this.tokenStorage.getUsername(),
      authorities: this.tokenStorage.getAuthorities()
    };
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  private getAllItem() {
    this.cartList = new Array();
    this.cartService.getAllItem().subscribe(value => {
      console.log(value);
      this.cartList = value;
      console.log(this.cartList);
      this.totalItemsCount(this.cartList);
      // this.reloadPage();

    });
  }

  private totalItemsCount(cartList: Array<Cart>) {
    let count = 0;
    for (const i in cartList) {
      count = count + (cartList[i].cartLines );
    }
    this.allCount = count;
    // this.reloadPage();
  }

  private reloadPage() {
    window.location.reload();
  }
}

