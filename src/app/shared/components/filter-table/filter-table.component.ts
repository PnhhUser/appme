import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-filter-table',
  imports: [FormsModule, NzInputModule],
  templateUrl: './filter-table.component.html',
  styleUrl: './filter-table.component.css',
})
export class FilterTableComponent {
  value = '';

  @Output() filterChange = new EventEmitter<string>();

  onChange(value: string) {
    this.filterChange.emit(value);
  }
}
