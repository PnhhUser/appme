import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private http = inject(HttpClient);

  get<T>(url: string): Observable<T | null> {
    return this.http.get<T>(url);
  }

  post<T>(url: string, data: T): Observable<T | null> {
    return this.http.post<T>(url, data);
  }
}
