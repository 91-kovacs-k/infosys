import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from './model/product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  products! : Product[];
  searchQuery! : string;
  formGroup : FormGroup = this.formBuilder.group({
    id: ['', Validators.required],
    title: [''],
    description: [''],
    price: 0,
    imgUrl: ['http://crm.rastreei.com/modules/products/uploads/no-product.png'],
    brand: ['']
  });

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
    ){

  }

  async ngOnInit(){
    this.products = await this.productService.loadProducts();
  }

  async search(){
    this.products = await this.productService.filterProduct(this.searchQuery);
  }

  addProduct(){
    const product = this.formGroup.value;
    this.productService.addProduct(product);
  }
}
