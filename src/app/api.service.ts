import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { } 

  getProducts(limit?: number, category?: string) {
    let url = 'https://fakestoreapi.com/products';
    if (limit && limit > 0) {
      url += `?limit=${limit}`;
    }
    if (category && category != '' && category != 'All') {
      url += `/category/${category}`;
    }
    return this.http.get(url);
  }

  getProductById(id?: number) {
    let url = 'https://fakestoreapi.com/products/' + id;
    return this.http.get(url);
  }
}