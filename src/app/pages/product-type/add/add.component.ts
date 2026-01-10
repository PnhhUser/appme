import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-add',
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
  styleUrl: './add.component.css',
})
export class AddComponent {
  formAdd!: FormGroup;

  constructor(
    private fb: NonNullableFormBuilder,
    private drawerRef: NzDrawerRef<boolean>
  ) {}

  ngOnInit(): void {
    this.formAdd = this.fb.group({
      productTypeName: ['', Validators.required],
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
