import { Component, OnInit } from '@angular/core';
import { User } from "../app.component";
import { Router } from "@angular/router";
import { CartService } from "../cart.service";

@Component({
  selector: 'app-merchant-welcome',
  templateUrl: './merchant-welcome.component.html',
  styleUrls: ['./merchant-welcome.component.css']
})
export class MerchantWelcomeComponent implements OnInit {

  modelMerchant: User = {
    username: '',
    password: '',
    email: '',
    phone: 0,
    firstname: '',
    lastname: '',
    address: '',
    merchant: null
  };

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit() {
    if (sessionStorage.getItem("userData")==null) {
      this.router.navigate(['login']);
    }

    let userData = JSON.parse(sessionStorage.getItem('userData'));
    console.log(userData);
    Object.assign(this.modelMerchant,userData);
  }


  clearLocal() {
    this.cartService.clearCart();
    sessionStorage.clear();
  }

}
