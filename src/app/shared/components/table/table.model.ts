export interface IColumn {
  key: string;
  title: string;
  width?: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  template?: 'text' | 'date' | 'currency' | 'status' | 'actions' | 'custom';
  format?: string; // 'dd/MM/yyyy', 'dd-MM-yyyy HH:mm', 'vi-VN', etc.
}

export interface ITableConfig {
  showPagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  bordered?: boolean;
  loading?: boolean;
  scroll?: { x?: string; y?: string };
  rowKey?: string;
  dateFormat?: string; // Global date format for all date columns
}
