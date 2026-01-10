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
import { PreviewDetailComponent as PreviewDetailProduct } from './preview-detail/preview-detail.component';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { FilterTableComponent } from '../../shared/components/filter-table/filter-table.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    SharedTableComponent,
    NzButtonModule,
    NzDrawerModule,
    NzModalModule,
    FilterTableComponent,
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less'],
})
export class ProductComponent {
  @ViewChild('drawerExtraTpl', { static: true })
  drawerExtraTpl!: TemplateRef<{}>;

  private drawerRef?: NzDrawerRef;
  private currentRow?: IProduct;

  filteredData: IProduct[] = [];
  filterKeyword: string = '';

  constructor(
    private store: Store,
    private drawerService: NzDrawerService,
    private modal: NzModalService
  ) {}

  columns: IColumn[] = [
    { key: 'Name', title: 'Tên sản phẩm', sortable: true },
    { key: 'Category', title: 'Loại sản phẩm', sortable: false },
    { key: 'Price', title: 'Giá bán', sortable: true },
    { key: 'Quantity', title: 'Số lượng', sortable: true },
  ];

  data: IProduct[] = [];

  ngOnInit(): void {
    this.store.dispatch(ProductAction.loadProduct());

    this.store.select(selectProducts).subscribe((data) => {
      this.data = data;
      this.filteredData = data;
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
      nzTitle: 'Chi tiết sản phẩm',
      nzContent: PreviewDetailProduct,
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
      nzTitle: 'Thểm mới sản phẩm',
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

  onFilterChange(keyword: string): void {
    this.filterKeyword = keyword.toLowerCase().trim();

    if (!this.filterKeyword) {
      this.filteredData = [...this.data];
      return;
    }

    this.filteredData = this.data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(this.filterKeyword)
      )
    );
  }
}
