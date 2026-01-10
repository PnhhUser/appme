import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { Observable } from 'rxjs';
import { IResponse } from '../../core/interface/response.interface';
import { ItransactionHistory } from './transaction-history.interface';

@Injectable({ providedIn: 'root' })
export class TransactionHistoryService {
  private httpService = inject(HttpService);

  getAll(): Observable<IResponse<ItransactionHistory> | null> {
    return this.httpService.get<IResponse<ItransactionHistory>>(
      'assets/data/transaction-history.json'
    );
  }
}
