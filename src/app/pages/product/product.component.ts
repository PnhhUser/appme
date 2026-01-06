import { selectProductLoading } from './../../stores/selectors/product.selector';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from './product.interface';
import { SharedTableComponent } from '../../shared/components/table/table.component';
import { Store } from '@ngrx/store';
import * as ProductAction from '../../stores/actions/product.action';
import { selectProducts } from '../../stores/selectors/product.selector';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { AddComponent as FormAddProduct } from './add/add.component';
import { IColumn } from '../../shared/components/table/table.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, SharedTableComponent, NzButtonModule, NzDrawerModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less'],
})
export class ProductComponent {
  constructor(private store: Store, private drawerService: NzDrawerService) {}

  columns: IColumn[] = [
    { key: 'Name', title: 'Product name', sortable: true },
    { key: 'Category', title: 'Category', sortable: false },
    { key: 'Price', title: 'Price', sortable: false },
    { key: 'Quantity', title: 'Quantity', sortable: false },
  ];

  data: IProduct[] = [];

  ngOnInit(): void {
    this.store.dispatch(ProductAction.loadProduct());

    this.store.select(selectProducts).subscribe((data) => {
      this.data = data;
    });

    this.store.select(selectProductLoading).subscribe((isLoad) => {
      this.tableConfig.loading = isLoad;
    });
  }

  tableConfig = {
    showPagination: true,
    pageSize: 10,
    bordered: true,
    loading: false,
  };

  onRowClick(row: any): void {
    console.log('Row clicked:', row);
  }

  onSortChange(event: { key: string; value: string }): void {
    console.log('Sort changed:', event);
    // Component đã tự xử lý sort, đây chỉ để log hoặc xử lý thêm nếu cần
  }

  openDrawer() {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Add product',
      nzContent: FormAddProduct,
      nzWidth: 520,
      nzClosable: false,
    });

    drawerRef.afterClose.subscribe((result) => {
      if (result) {
        console.log('Reload data', result);
      }
    });
  }
}
