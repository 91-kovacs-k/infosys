import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  products!: Product[];

  formGroup: FormGroup = this.formBuilder.group({
    id: ['', [Validators.required, Validators.pattern(/^[A-z0-9]+$/)]],
    title: [''],
    description: [''],
    price: [0, [Validators.min(1), Validators.max(10)]],
    imgUrl: [
      'http://crm.rastreei.com/modules/products/uploads/no-product.png',
      [Validators.pattern(/^http/)],
    ],
    brand: [''],
  });

  get id() {
    return this.formGroup.get('id');
  }

  get price() {
    return this.formGroup.get('price');
  }

  get imgUrl() {
    return this.formGroup.get('imgUrl');
  }

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  addProduct() {
    const product = this.formGroup.value;
    this.productService.addProduct(product);

    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {}
}
