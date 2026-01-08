import { selectProductLoading } from './../../stores/selectors/product.selector';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from './product.interface';
import { SharedTableComponent } from '../../shared/components/table/table.component';
import { Store } from '@ngrx/store';
import * as ProductAction from '../../stores/actions/product.action';
import { selectProducts } from '../../stores/selectors/product.selector';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  NzDrawerModule,
  NzDrawerRef,
  NzDrawerService,
} from 'ng-zorro-antd/drawer';
import { AddComponent as FormAddProduct } from './add/add.component';
import { IColumn } from '../../shared/components/table/table.model';
import { EditComponent as FormEditProduct } from './edit/edit.component';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    SharedTableComponent,
    NzButtonModule,
    NzDrawerModule,
    NzModalModule,
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less'],
})
export class ProductComponent {
  @ViewChild('drawerExtraTpl', { static: true })
  drawerExtraTpl!: TemplateRef<{}>;

  private drawerRef?: NzDrawerRef;
  private currentRow?: IProduct;

  constructor(
    private store: Store,
    private drawerService: NzDrawerService,
    private modal: NzModalService
  ) {}

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

  drawerConfig = {
    width: 520,
    nzClosable: false,
  };

  onRowClick(row: IProduct): void {
    this.currentRow = row;

    this.drawerRef = this.drawerService.create({
      nzTitle: 'Preview detail',
      nzContent: FormEditProduct,
      nzWidth: this.drawerConfig.width,
      nzClosable: this.drawerConfig.nzClosable,
      nzData: row,
      nzExtra: this.drawerExtraTpl,
    });

    this.drawerRef.afterClose.subscribe((result) => {
      if (result?.action === 'delete') {
        console.log('Deleted → reload table');
      }
    });
  }

  onSortChange(event: { key: string; value: string }): void {
    console.log('Sort changed:', event);
    // Component đã tự xử lý sort, đây chỉ để log hoặc xử lý thêm nếu cần
  }

  openDrawer() {
    const drawer = this.drawerService.create({
      nzTitle: 'New product',
      nzContent: FormAddProduct,
      nzWidth: this.drawerConfig.width,
      nzClosable: this.drawerConfig.nzClosable,
    });

    drawer.afterClose.subscribe((result) => {
      if (result) {
        console.log('Reload data', result);
      }
    });
  }

  deleteCurrent(): void {
    if (!this.currentRow) return;

    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Bạn có chắc muốn xóa sản phẩm <b>${this.currentRow.Name}</b>?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        // 🔥 dispatch delete
        console.log('xóa');

        // 🔥 đóng drawer
        this.drawerRef?.close({
          action: 'delete',
          id: this.currentRow!.Id,
        });
      },
    });
  }
}
