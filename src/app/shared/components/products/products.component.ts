import { Component, Output, Input, EventEmitter } from '@angular/core';

import { zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CreateProductDTO, Product, UpdateProductDTO } from '../../../models/product.model';
import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';
import Swal from 'sweetalert2';
//import { ToastrService } from 'ngx-toastr';
//import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  total = 0;

  myShoppingCart: Product[] = [];

  @Input() products: Product[] = [];
  //@Input() productId: string | null = null;
  @Input() set productId(id: string | null) {
    if (id) {
      this.onShowDetail(id);
    }
  }
  @Output() loadMore: EventEmitter<string> = new EventEmitter<string>();

  onLoadMore() {
    this.loadMore.emit();
  }

  showProductDetail = false;

  productChosen!: Product;

  //limit = 10;
  //offset = 10;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  today = new Date();
  date = new Date(2019, 11, 5);

  constructor(
    private storeService: StoreService,
    private productService: ProductsService,
    //private toastr: ToastrService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  // ngOnInit(): void {

  //   this.productService.getProductsByPage(10, 0)
  //     .subscribe(data => {
  //       data.forEach(item => item.images = ['https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100), 'https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100), 'https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100)]);
  //       this.products = data;
  //     });

  // }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);

    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    if(!this.showProductDetail){
      this.showProductDetail = true;
    }
    this.productService.getProduct(id)
      .subscribe({
        next: (data) => {
          data.images = ['https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100), 'https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100), 'https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100)];
          //this.toggleProductDetail();
          this.productChosen = data;
          this.statusDetail = 'success';
          //this.toastr.success('Hola mundo');
        },
        error: (e) => {
          this.statusDetail = 'error';
          //Una forma
          Swal.fire({

            title: 'Error!',

            text: e,

            icon: 'error',

            confirmButtonText: 'Ok',

          });

          //Otra forma
          //this.toastr.error(e);

        },
        complete: () => console.info("Complete")

      });
  }

  // readAndUpdate(id: string) {
  //   this.productService.getProduct(id)
  //     .subscribe(data => {
  //       const product = data;
  //       this.productService.update(product.id, { title: 'Changed Title' })
  //         .subscribe(rtaUpdate => {
  //           console.log(rtaUpdate);
  //         })
  //     })
  // } //lo mismo abajo pero sin call hell gracias a switchMap

  //Esto es a modo de prueba este codigo deberia ir en el ProductService y no en este componente. Esto se hizo solo por fines didacticos
  readAndUpdate(id: string) {
    this.productService.getProduct(id)
      .pipe(
        switchMap((product) => this.productService.update(product.id, { title: 'Changed Title' })),
        switchMap((product) => this.productService.update(product.id, { title: 'Changed Title' })),
        switchMap((product) => this.productService.update(product.id, { title: 'Changed Title' })),
        switchMap((product) => this.productService.update(product.id, { title: 'Changed Title' })),
      )
      .subscribe(rtaUpdate => {
        console.log(rtaUpdate);
      });

    zip(
      this.productService.getProduct(id),
      this.productService.delete(id)
    )
      .subscribe(response => {
        const product = response[0];
        const estate = response[1];
      })
  }


  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo Producto',
      description: 'Description nuevo producto',
      images: ['https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100), 'https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100), 'https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100)],
      price: 1000,
      categoryId: 2
    }
    this.productService.create(product)
      .subscribe(data => {
        this.products.unshift(data);
      });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'Nuevo title',
      price: 999
    }
    const id = this.productChosen.id;
    this.productService.update(id, changes)
      .subscribe(data => {
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
        this.products[productIndex] = data;
        this.productChosen = data;
      });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productService.delete(id)
      .subscribe(() => {
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
        this.products.splice(productIndex, 1);
        this.showProductDetail = false;
      });
  }

  // loadMore() {
  //   this.productService.getProductsByPage(this.limit, this.offset)
  //     .subscribe(data => {
  //       data.forEach(item => item.images = ['https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100), 'https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100), 'https://picsum.photos/640/480?random=' + Math.floor(Math.random() * 100)]);
  //       this.products = this.products.concat(data);
  //       this.offset += this.limit;
  //     });
  // }

}
