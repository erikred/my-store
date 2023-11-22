import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId!: string | null;
  products: Product[] = [];
  limit = 10;
  offset = 10;
  productId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }


  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.productsService.getByCategory(this.categoryId, this.limit, this.offset);
          }
          return [];
        })
      )
      .subscribe(data => {
        this.products = data;
      });
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
    });
  }

  onLoadMore() {
    this.productsService.getByCategory(this.categoryId ?? '1', this.limit, this.offset)
      .subscribe(data => {
        data.forEach(item => item.images = ['https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100), 'https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100), 'https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100)]);
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }

}
