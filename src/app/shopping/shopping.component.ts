import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalContentComponent } from '../modal-content/modal-content.component';// Asegúrate de ajustar la ruta de 
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss'
})

export class ShoppingComponent implements OnInit {
  limit: number = 10;
  category: string = '';
  products: any[] = [];
  constructor(private apiService: ApiService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts(limit:number = this.limit , category:string = this.category) {
    this.apiService.getProducts(limit,category).subscribe((data: any) => {
      this.products = data;
    }, error => {
      console.error('Error fetching products:', error);
    });
  }

  onLimitChange(event: Event) {
    const target = event.target as HTMLSelectElement; // Ahora la aserción de tipo se hace aquí
    const value = Number(target.value);
    this.limit = value;
    this.category = '';
    this.fetchProducts(value,undefined);
  }

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = String(target.value);
    this.category = value;
    this.limit = 0;
    this.fetchProducts(undefined,value);
  }

  openModal(product : any) { 
    this.apiService.getProductById(product.id).subscribe({
      next: (product) => {
        this.dialog.open(ModalContentComponent, {
          data: { product }
        });
      },
      error: (err) => {
        console.error('Failed to fetch product details', err);
      }
    });
  }

  loggout() {
    this.router.navigate(['/']);
  }
}
