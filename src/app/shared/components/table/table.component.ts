// table.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FormsModule } from '@angular/forms';
import { IColumn, ITableConfig } from './table.model';

@Component({
  selector: 'app-shared-table',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzToolTipModule,
    FormsModule,
    NzTagModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class SharedTableComponent implements OnInit, OnChanges {
  // Inputs
  @Input() cols: IColumn[] = [];
  @Input() rows: any[] = [];
  @Input() config: ITableConfig = {};
  @Input() rowActionsTemplate?: TemplateRef<any>;
  @Input() customCellTemplates: { [key: string]: TemplateRef<any> } = {};

  // Outputs
  @Output() rowClick = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<{ key: string; value: string }>();
  @Output() pageChange = new EventEmitter<{ page: number; pageSize: number }>();

  // Default config
  defaultConfig: ITableConfig = {
    showPagination: true,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    showSizeChanger: true,
    showQuickJumper: true,
    bordered: true,
    loading: false,
    scroll: undefined,
    rowKey: 'id',
  };

  // Current sort state
  sortState: { [key: string]: 'ascend' | 'descend' | null } = {};

  // Store original data for reset
  private originalData: any[] = [];

  // Display data (sorted/filtered)
  displayData: any[] = [];

  get tableConfig(): ITableConfig {
    return { ...this.defaultConfig, ...this.config };
  }

  get totalItems(): number {
    return this.displayData?.length || 0;
  }

  ngOnInit(): void {
    this.initializeData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rows']) {
      this.initializeData();
    }
  }

  private initializeData(): void {
    // Lưu dữ liệu gốc
    this.originalData = [...this.rows];
    this.displayData = [...this.rows];

    // Reset sort state
    this.sortState = {};
  }

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

  onSort(sortKey: string): void {
    console.log('Sort clicked for:', sortKey);

    if (!this.isSortable(sortKey)) {
      console.log('Not sortable:', sortKey);
      return;
    }

    // Lấy trạng thái hiện tại, mặc định là null nếu chưa có
    const currentSort = this.sortState[sortKey] || null;
    let newSort: 'ascend' | 'descend' | null = 'ascend';

    // Logic luân chuyển: null -> ascend -> descend -> null
    if (currentSort === 'ascend') {
      newSort = 'descend';
    } else if (currentSort === 'descend') {
      newSort = null;
    } else {
      newSort = 'ascend';
    }

    console.log('Current:', currentSort, 'New:', newSort);

    // Reset other sorts (chỉ sort 1 cột cùng lúc)
    Object.keys(this.sortState).forEach((key) => {
      if (key !== sortKey) {
        this.sortState[key] = null;
      }
    });

    // Cập nhật trạng thái sort
    this.sortState[sortKey] = newSort;

    // Thực hiện sort dữ liệu
    if (newSort) {
      this.applySort(sortKey, newSort);
    } else {
      // Reset về dữ liệu gốc nếu không sort
      this.displayData = [...this.originalData];
    }

    // Emit event với value đúng
    this.sortChange.emit({
      key: sortKey,
      value: newSort ? newSort : 'null',
    });
  }

  private applySort(key: string, direction: 'ascend' | 'descend'): void {
    this.displayData = [...this.displayData].sort((a, b) => {
      const valueA = this.getCellValue(a, key);
      const valueB = this.getCellValue(b, key);

      // Xử lý null/undefined
      if (valueA == null && valueB == null) return 0;
      if (valueA == null) return direction === 'ascend' ? -1 : 1;
      if (valueB == null) return direction === 'ascend' ? 1 : -1;

      // Xử lý string
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction === 'ascend'
          ? valueA.localeCompare(valueB, undefined, { sensitivity: 'base' })
          : valueB.localeCompare(valueA, undefined, { sensitivity: 'base' });
      }

      // Xử lý number
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return direction === 'ascend' ? valueA - valueB : valueB - valueA;
      }

      // Xử lý boolean
      if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
        const boolA = valueA ? 1 : 0;
        const boolB = valueB ? 1 : 0;
        return direction === 'ascend' ? boolA - boolB : boolB - boolA;
      }

      // Xử lý Date
      const dateA = new Date(valueA);
      const dateB = new Date(valueB);
      if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
        return direction === 'ascend'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      // Mặc định: convert thành string để compare
      const strA = String(valueA);
      const strB = String(valueB);
      return direction === 'ascend'
        ? strA.localeCompare(strB)
        : strB.localeCompare(strA);
    });
  }

  isSortable(key: string): boolean {
    const column = this.cols.find((col) => col.key === key);
    return column?.sortable || false;
  }

  getSortIcon(key: string): string {
    const sort = this.sortState[key];
    if (sort === 'ascend') return 'caret-up';
    if (sort === 'descend') return 'caret-down';
    return 'sort-ascending';
  }

  onPageChange(page: number): void {
    this.pageChange.emit({ page, pageSize: this.tableConfig.pageSize! });
  }

  onPageSizeChange(pageSize: number): void {
    this.pageChange.emit({ page: 1, pageSize });
  }

  getColumnWidth(col: IColumn): string {
    return col.width || 'auto';
  }

  getColumnAlign(col: IColumn): 'left' | 'center' | 'right' {
    return col.align || 'left';
  }

  hasCustomTemplate(key: string): boolean {
    return !!this.customCellTemplates[key];
  }

  getCellValue(row: any, key: string): any {
    // Handle nested properties (e.g., 'user.name')
    return key.split('.').reduce((obj, k) => obj?.[k], row);
  }

  formatValue(value: any, col: IColumn): string {
    if (value == null || value === undefined) return '-';

    switch (col.template) {
      case 'date':
        return this.formatDate(value, col.format);
      case 'currency':
        return this.formatCurrency(value, col.format);
      default:
        return value.toString();
    }
  }

  private formatDate(value: any, format?: string): string {
    try {
      const date = new Date(value);

      // Kiểm tra nếu date không hợp lệ
      if (isNaN(date.getTime())) {
        return '-';
      }

      // Nếu có format string, dùng Intl.DateTimeFormat
      if (format) {
        // format có thể là 'dd/MM/yyyy' hoặc 'locale string'
        if (format.includes('/')) {
          // Nếu là định dạng ngày, parse và format thủ công
          const options: Intl.DateTimeFormatOptions = {};

          if (format.includes('dd')) options.day = '2-digit';
          if (format.includes('MM')) options.month = '2-digit';
          if (format.includes('yyyy')) options.year = 'numeric';
          if (format.includes('HH')) options.hour = '2-digit';
          if (format.includes('mm')) options.minute = '2-digit';
          if (format.includes('ss')) options.second = '2-digit';

          return new Intl.DateTimeFormat('vi-VN', options).format(date);
        } else {
          // Nếu là locale string (ví dụ: 'vi-VN')
          return date.toLocaleDateString(format);
        }
      }

      // Mặc định dùng định dạng Việt Nam
      return date.toLocaleDateString('vi-VN');
    } catch (error) {
      console.error('Error formatting date:', error);
      return '-';
    }
  }

  private formatCurrency(value: number, format?: string): string {
    return new Intl.NumberFormat(format || 'vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  }
}
