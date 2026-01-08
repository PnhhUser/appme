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
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  formEdit!: FormGroup;

  categories = [
    { id: 1, name: 'Toys' },
    { id: 2, name: 'Food - Meat' },
    { id: 3, name: 'Pets' },
  ];

  constructor(
    private drawerRef: NzDrawerRef<boolean>,
    private fb: NonNullableFormBuilder,
    @Inject(NZ_DRAWER_DATA) public data: IProduct
  ) {
    const category = this.categories.find((item) =>
      item.name
        .toLocaleLowerCase()
        .includes(data.Category.toLocaleLowerCase().trim())
    );

    this.formEdit = this.fb.group({
      productName: [data.Name, Validators.required],
      quantity: [data.Quantity, [Validators.required, Validators.min(1)]],
      price: [data.Price, [Validators.required, Validators.min(1000)]],

      categoryId: [category?.id, Validators.required],
    });
  }

  save(): void {
    if (this.formEdit.invalid) {
      this.formEdit.markAllAsTouched();
      return;
    }

    console.log(this.formEdit.getRawValue());
    this.drawerRef.close(true);
  }

  close(): void {
    this.drawerRef.close();
  }
}
