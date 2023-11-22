import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../../services/products.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  limit = 10;
  offset = 10;
  productId: string | null = null;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.productsService.getProductsByPage(10, 0)
      .subscribe(data => {
        data.forEach(item => item.images = ['https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100), 'https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100), 'https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100)]);
        this.products = data;
      });
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
    });
  }

  onLoadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset)
      .subscribe(data => {
        data.forEach(item => item.images = ['https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100), 'https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100), 'https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100)]);
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }

}
