import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { IProduct } from './product.interface';
import { map, Observable } from 'rxjs';
import { IResponse } from '../../core/interface/response.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private httpService = inject(HttpService);

  getAll(): Observable<IResponse<IProduct> | null> {
    return this.httpService.get<IResponse<IProduct>>(
      'assets/data/product.json'
    );
  }
}
