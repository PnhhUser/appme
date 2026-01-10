import { Component, TemplateRef, ViewChild } from '@angular/core';
// import { FilterTableComponent } from '../../shared/components/filter-table/filter-table.component';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import {
  NzDrawerModule,
  NzDrawerRef,
  NzDrawerService,
} from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SharedTableComponent } from '../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { IProductType } from './product-type.interface';
import { Store } from '@ngrx/store';
import { IColumn } from '../../shared/components/table/table.model';

import * as ProductTypeAction from '../../stores/actions/product-type.action';
import {
  selectProductTypeLoading,
  selectProductTypes,
} from '../../stores/selectors/product-type.selector';

import { AddComponent as AddTypeProduct } from './add/add.component';
import { PreviewDetailComponent as PreviewDetailProductType } from './preview-detail/preview-detail.component';

@Component({
  selector: 'app-product-type',
  imports: [
    CommonModule,
    SharedTableComponent,
    NzButtonModule,
    NzDrawerModule,
    NzModalModule,
  ],
  templateUrl: './product-type.component.html',
  styleUrl: './product-type.component.css',
})
export class ProductTypeComponent {
  @ViewChild('drawerExtraTpl', { static: true })
  drawerExtraTpl!: TemplateRef<{}>;

  filterKeyword: string = '';

  private drawerRef?: NzDrawerRef;
  private currentRow?: IProductType;

  constructor(
    private store: Store,
    private drawerService: NzDrawerService,
    private modal: NzModalService
  ) {}

  data: IProductType[] = [];

  ngOnInit(): void {
    this.store.dispatch(ProductTypeAction.loadProductType());

    this.store.select(selectProductTypes).subscribe((data) => {
      this.data = data;
    });

    this.store.select(selectProductTypeLoading).subscribe((isLoad) => {
      this.tableConfig.loading = isLoad;
    });
  }

  columns: IColumn[] = [{ key: 'Name', title: 'Product type', sortable: true }];

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

  onRowClick(row: IProductType): void {
    this.currentRow = row;

    this.drawerRef = this.drawerService.create({
      nzTitle: 'Preview detail',
      nzContent: PreviewDetailProductType,
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
      nzTitle: 'Thêm mới loại sản phẩm',
      nzContent: AddTypeProduct,
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
      nzContent: `Bạn có chắc muốn xóa loại sản phẩm <b>${this.currentRow.Name}</b>?`,
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
