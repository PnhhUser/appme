import { Component } from '@angular/core';
import {
  NonNullableFormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Store } from '@ngrx/store';
import * as ProductTypeAction from '../../../stores/actions/product-type.action';
import { selectProductTypes } from '../../../stores/selectors/product-type.selector';
import { IProductType } from '../../product-type/product-type.interface';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzSelectModule,
    NzInputNumberModule,
    NzInputModule,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.less',
})
export class AddComponent {
  formAdd!: FormGroup;

  productTypes: IProductType[] = [];

  constructor(
    private drawerRef: NzDrawerRef<boolean>,
    private fb: NonNullableFormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ProductTypeAction.loadProductType());

    this.store.select(selectProductTypes).subscribe((data) => {
      this.productTypes = data;
    });

    const productTypeIds = this.productTypes.map((pt) => pt.Id);

    this.formAdd = this.fb.group({
      productName: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1000)]],
      categoryId: [productTypeIds, Validators.required],
    });
  }

  save(): void {
    if (this.formAdd.invalid) {
      this.formAdd.markAllAsTouched();
      return;
    }

    console.log(this.formAdd.getRawValue());
    this.drawerRef.close(true);
  }

  close(): void {
    this.drawerRef.close();
  }
}
