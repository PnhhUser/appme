import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { localStorageHelper } from './shared/helper/localstorage.helper';
import { COLLAPSED } from './core/const/app.const';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    localStorageHelper.set<boolean>(
      COLLAPSED,
      localStorageHelper.get(COLLAPSED) ?? false
    );
  }
}
