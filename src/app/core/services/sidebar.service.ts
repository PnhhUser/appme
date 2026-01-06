import { Injectable, signal } from '@angular/core';
import { localStorageHelper } from '../../shared/helper/localstorage.helper';
import { COLLAPSED } from '../const/app.const';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private _collapsed = signal<boolean>(
    localStorageHelper.get<boolean>(COLLAPSED) ?? false
  );

  collapsed = this._collapsed.asReadonly();

  toggle() {
    const next = !this._collapsed();
    this._collapsed.set(next);
    localStorageHelper.set(COLLAPSED, next);
  }

  set(value: boolean) {
    this._collapsed.set(value);
    localStorageHelper.set(COLLAPSED, value);
  }
}
