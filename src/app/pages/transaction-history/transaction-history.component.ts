import { Component } from '@angular/core';
import { SharedTableComponent } from '../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { IColumn } from '../../shared/components/table/table.model';
import { Store } from '@ngrx/store';
import { ItransactionHistory } from './transaction-history.interface';
import * as TransactionHistoryAction from '../../stores/actions/transaction-history.action';
import { selectTransactionHistory } from '../../stores/selectors/transaction-history.selector';
import * as ProductAction from '../../stores/actions/product.action';
import { combineLatest } from 'rxjs';
import { selectProducts } from '../../stores/selectors/product.selector';

interface ITransactionHistoryTable {
  Customer: string;
  Product: string;
  TransactionDate: Date;
  QuantitySold: number;
  Amount: number;
  TransactionType: string;
}

@Component({
  selector: 'app-transaction-history',
  imports: [CommonModule, SharedTableComponent],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css',
})
export class TransactionHistoryComponent {
  private currentRow?: ITransactionHistoryTable;

  data: ITransactionHistoryTable[] = [];

  tableConfig = {
    showPagination: true,
    pageSize: 10,
    bordered: true,
    loading: false,
  };

  drawerConfig = {
    width: 520,
    nzClosable: false,
  };

  customers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
  ];

  columns: IColumn[] = [
    { key: 'Customer', title: 'Tên khách hàng', sortable: true },
    { key: 'Product', title: 'Tên sản phẩm', sortable: true },
    {
      key: 'TransactionDate',
      title: 'Ngày giao dịch',
      sortable: false,
      format: 'dd/MM/yyyy HH:mm',
      template: 'date',
    },
    { key: 'QuantitySold', title: 'Số lượng bán', sortable: false },
    { key: 'Amount', title: 'Số tiền', sortable: true },
    { key: 'TransactionType', title: 'Loại giao dịch', sortable: true },
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(TransactionHistoryAction.loadTransactionHistory());
    this.store.dispatch(ProductAction.loadProduct());

    combineLatest([
      this.store.select(selectTransactionHistory),
      this.store.select(selectProducts),
    ]).subscribe(([transactions, products]) => {
      if (!transactions.length || !products.length) return;

      this.data = transactions.map((item: ItransactionHistory) => {
        const customer = this.customers.find((c) => c.id === item.CustomerId);

        const product = products.find((p) => p.Id === item.ProductId);

        return {
          Customer: customer ? customer.name : 'Unknown',
          Product: product ? product.Name : 'Unknown',
          TransactionDate: new Date(item.TransactionDate),
          QuantitySold: item.QuantitySold,
          Amount: item.Amount,
          TransactionType: item.TransactionType,
        };
      });
    });
  }

  onRowClick(row: ITransactionHistoryTable): void {
    this.currentRow = row;

    console.log(row);
  }

  onSortChange(event: { key: string; value: string }): void {
    console.log('Sort changed:', event);
    // Component đã tự xử lý sort, đây chỉ để log hoặc xử lý thêm nếu cần
  }
}
