import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { checkTime } from '../interceptors/time.interceptor';
import { environment  } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/products`;
  private apiUrlCategory = `${environment.API_URL}/api/categories/`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllProducts() {
    return this.httpClient.get<Product[]>(this.apiUrl)
    .pipe(
      retry(3)
    );
  }
  getProduct(id: string) {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.InternalServerError){
          return throwError(()=> new Error('Algo falla en el servidor'));
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError(()=> new Error('El producto no existe'));
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError(()=> new Error('No estas autorizado'));
        }
        return throwError(()=> new Error('Algo salió mal'));
      })
    );
  }
  create(data: CreateProductDTO) {
    return this.httpClient.post<Product>(this.apiUrl, data);
  }
  update(id: string, dto: UpdateProductDTO) {
    return this.httpClient.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string) {
    return this.httpClient.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  getProductsByPage(limit: number, offset: number){
    return this.httpClient.get<Product[]>(this.apiUrl, {
      params: {limit, offset}, context: checkTime()
    })
    .pipe(
      retry(2),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .18 * item.price
        }
      }))
    );
  }

getByCategory( categoryId: string, limit: number, offset: number) {
  let params = new HttpParams();
  if(limit && offset != null){
    params = params.set('limit', limit);
    params = params.set('offset', offset);
  }
  return this.httpClient.get<Product[]>(`${this.apiUrlCategory}${categoryId}/products`, { params })
}

}
