import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { productReducer } from './stores/reducers/product.reducer';
import { ProductEffect } from './stores/effects/product.effect';
import { ProductTypeEffect } from './stores/effects/product-type.effect';
import { productTypeReducer } from './stores/reducers/product-type.reducer';
import { TransactionHistoryEffect } from './stores/effects/transaction-history.effect';
import { transactionHistoryReducer } from './stores/reducers/transaction-history.reducer';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore(),
    provideEffects([
      ProductEffect,
      ProductTypeEffect,
      TransactionHistoryEffect,
    ]),
    provideStore({
      product: productReducer,
      productType: productTypeReducer,
      transactionHistory: transactionHistoryReducer,
    }),
  ],
};
