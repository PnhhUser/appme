import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IProductType } from '../product-type.interface';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-preview-detail',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzSelectModule,
    NzInputNumberModule,
    NzInputModule,
    NzDatePickerModule,
  ],
  templateUrl: './preview-detail.component.html',
  styleUrl: './preview-detail.component.css',
})
export class PreviewDetailComponent {
  formPreview!: FormGroup;

  constructor(
    private fb: NonNullableFormBuilder,
    private drawerRef: NzDrawerRef<boolean>,
    @Inject(NZ_DRAWER_DATA) public data: IProductType
  ) {
    this.formPreview = this.fb.group({
      productNameType: [this.data.Name, Validators.required],
      createdAt: [this.data.CreatedAt ? new Date(this.data.CreatedAt) : null],
      updatedAt: [this.data.UpdatedAt ? new Date(this.data.UpdatedAt) : null],
    });
  }

  ngOnInit(): void {}

  save(): void {
    if (this.formPreview.invalid) {
      this.formPreview.markAllAsTouched();
      return;
    }

    console.log(this.formPreview.getRawValue());
    this.drawerRef.close(true);
  }

  close(): void {
    this.drawerRef.close();
  }
}
