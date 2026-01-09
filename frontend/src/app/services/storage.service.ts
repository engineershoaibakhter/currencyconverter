import { Injectable } from '@angular/core';
import { ConversionHistory } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'currency_conversion_history';

  getHistory(): ConversionHistory[] {
    const history = localStorage.getItem(this.STORAGE_KEY);
    if (!history) return [];
    
    // Filter out invalid entries (missing rate or convertedAmount)
    const parsed = JSON.parse(history) as ConversionHistory[];
    return parsed.filter(item => 
      item.rate !== undefined && 
      item.rate !== null && 
      item.convertedAmount !== undefined && 
      item.convertedAmount !== null
    );
  }

  addToHistory(conversion: ConversionHistory): void {
    const history = this.getHistory();
    history.unshift(conversion); // Add to beginning of array
    // Keep only last 50 conversions
    if (history.length > 50) {
      history.pop();
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
  }

  clearHistory(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  deleteHistoryItem(id: string): void {
    let history = this.getHistory();
    history = history.filter(item => item.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
  }
}
