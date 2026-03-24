import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCountSource = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSource.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored = sessionStorage.getItem('cartCount');
    if (stored !== null) {
      const count = parseInt(stored, 10);
      if (!isNaN(count)) {
        this.cartCountSource.next(count);
      }
    }
  }

  updateCount(count: number): void {
    this.cartCountSource.next(count);
    sessionStorage.setItem('cartCount', count.toString());
  }

  clearCart(): void {
    this.cartCountSource.next(0);
    sessionStorage.removeItem('cartCount');
    sessionStorage.removeItem('total');
  }

  getCount(): number {
    return this.cartCountSource.getValue();
  }
}
