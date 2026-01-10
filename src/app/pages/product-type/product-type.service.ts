import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http.service';

import { Observable } from 'rxjs';
import { IResponse } from '../../core/interface/response.interface';
import { IProductType } from './product-type.interface';

@Injectable({ providedIn: 'root' })
export class ProductTypeService {
  private httpService = inject(HttpService);

  getAll(): Observable<IResponse<IProductType> | null> {
    return this.httpService.get<IResponse<IProductType>>(
      'assets/data/product-type.json'
    );
  }
}
