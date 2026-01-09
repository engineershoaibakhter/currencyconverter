import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ConversionResult } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/currency/currencies`);
  }

  getLatestRates(baseCurrency: string, currencies?: string): Observable<any> {
    let params = new HttpParams().set('base_currency', baseCurrency);
    if (currencies) {
      params = params.set('currencies', currencies);
    }
    return this.http.get(`${this.apiUrl}/currency/latest`, { params });
  }

  getHistoricalRates(date: string, baseCurrency: string, currencies?: string): Observable<any> {
    let params = new HttpParams()
      .set('date', date)
      .set('base_currency', baseCurrency);
    if (currencies) {
      params = params.set('currencies', currencies);
    }
    return this.http.get(`${this.apiUrl}/currency/historical`, { params });
  }

  convertCurrency(from: string, to: string, amount: number, date?: string): Observable<ConversionResult> {
    const body = { from, to, amount, date };
    return this.http.post<ConversionResult>(`${this.apiUrl}/currency/convert`, body);
  }
}
