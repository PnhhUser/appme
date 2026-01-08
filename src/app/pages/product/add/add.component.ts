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

  categories = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Phone' },
    { id: 3, name: 'Accessory' },
  ];

  constructor(
    private drawerRef: NzDrawerRef<boolean>,
    private fb: NonNullableFormBuilder
  ) {
    this.formAdd = this.fb.group({
      productName: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1000)]],
      categoryId: [null as number | null, Validators.required],
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
