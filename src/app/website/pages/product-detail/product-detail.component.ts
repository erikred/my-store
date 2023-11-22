import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Category, Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{

  productId: string | null = null;
  product!: Product | null;
  category!: Category;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.productId = params.get('id');
        if(this.productId) {
          return this.productsService.getProduct(this.productId);
        }
        return [null];
      })
    ).subscribe(data => {
      if(data){
        data.images = ['https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100), 'https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100), 'https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100)];
        this.category=data.category;
        this.product = data;
      }
    })
  }
  goToBack() {
    // this.location.back();
    //this.router.navigate(['/category', this.category.id]);
    this.router.navigate(['/home']);
  }
}
