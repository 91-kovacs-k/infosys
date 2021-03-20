import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  storage!: Product[];

  constructor(private http : HttpClient) {

   }

   async loadStorageIfEmpty(){
     if(!this.storage || this.storage.length === 0){
       this.storage = await this.http.get<Product[]>('assets/products.json').toPromise();
     }
   }
/*
   loadProduct(){
    return this.http.get<Product[]>('assets/products.json').toPromise();
  }
*/

  async loadProducts(){
    await this.loadStorageIfEmpty();
    return this.storage;
  }
/*
  filterProduct(query : string){
    const products = this.loadProducts();
    return this.products.filter((product) => {
      if(!product.title){
        return false;
      }else{
        return product.title.includes(query);
      }
    });
  }
  */

  async filterProduct(query : string){
    await this.loadStorageIfEmpty();

    return this.storage.filter((product) => {
      if(!product.title){
        return false;
      }else{
        return product.title.toLowerCase().includes(query.toLowerCase());
      }
    });
  }

  async addProduct(product : Product){
    await this.loadStorageIfEmpty();

    this.storage.unshift(product);
  }

}
