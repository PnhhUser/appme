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
import { IProduct } from '../product.interface';
import { IProductType } from '../../product-type/product-type.interface';
import { Store } from '@ngrx/store';
import * as ProductTypeAction from '../../../stores/actions/product-type.action';
import { selectProductTypes } from '../../../stores/selectors/product-type.selector';
import { filter, take } from 'rxjs';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-edit',
  standalone: true,
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

  productTypes: IProductType[] = [];

  constructor(
    private drawerRef: NzDrawerRef<boolean>,
    private fb: NonNullableFormBuilder,
    @Inject(NZ_DRAWER_DATA) public data: IProduct,
    private store: Store
  ) {
    this.formPreview = this.fb.group({
      productName: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1000)]],
      categoryId: [null, Validators.required],
      createdAt: [null],
      updatedAt: [null],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(ProductTypeAction.loadProductType());

    this.store
      .select(selectProductTypes)
      .pipe(
        filter((data) => data.length > 0),
        take(1)
      )
      .subscribe((data) => {
        this.productTypes = data;

        const category = data.find((item) =>
          item.Name.toLowerCase().includes(
            this.data.Category.toLowerCase().trim()
          )
        );

        this.formPreview.patchValue({
          productName: this.data.Name,
          quantity: this.data.Quantity,
          price: this.data.Price,
          categoryId: category?.Id,
          createdAt: this.data.CreatedAt ? new Date(this.data.CreatedAt) : null,
          updatedAt: this.data.UpdatedAt ? new Date(this.data.UpdatedAt) : null,
        });
      });
  }

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
