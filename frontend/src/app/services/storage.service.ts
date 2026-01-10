import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConversionHistory } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnDestroy {
  private readonly STORAGE_KEY = 'currency_conversion_history';
  private historySubject: BehaviorSubject<ConversionHistory[]>;
  readonly history$: Observable<ConversionHistory[]>;

  private storageListener = (event: StorageEvent) => {
    if (event.key === this.STORAGE_KEY) {
      this.historySubject.next(this.readHistoryFromStorage());
    }
  };

  constructor() {
    this.historySubject = new BehaviorSubject<ConversionHistory[]>(this.readHistoryFromStorage());
    this.history$ = this.historySubject.asObservable();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.storageListener);
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', this.storageListener);
    }
  }

  getHistory(): ConversionHistory[] {
    return this.historySubject.value;
  }

  addToHistory(conversion: ConversionHistory): void {
    const history = [conversion, ...this.historySubject.value].slice(0, 50);
    this.persistHistory(history);
  }

  clearHistory(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
    this.historySubject.next([]);
  }

  deleteHistoryItem(id: string): void {
    const history = this.historySubject.value.filter(item => item.id !== id);
    this.persistHistory(history);
  }

  private persistHistory(history: ConversionHistory[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    }
    this.historySubject.next(history);
  }

  private readHistoryFromStorage(): ConversionHistory[] {
    if (typeof window === 'undefined') {
      return [];
    }
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored) as ConversionHistory[];
    return parsed.filter(item =>
      item.rate !== undefined &&
      item.rate !== null &&
      item.convertedAmount !== undefined &&
      item.convertedAmount !== null
    );
  }
}
