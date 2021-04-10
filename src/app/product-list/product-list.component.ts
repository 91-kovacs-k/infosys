import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @Input() products!: Product[];

  searchQuery!: string;

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    this.products = await this.productService.loadProducts();
  }
  async search() {
    this.products = await this.productService.filterProduct(this.searchQuery);
  }
}
