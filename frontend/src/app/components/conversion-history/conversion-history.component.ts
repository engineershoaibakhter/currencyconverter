import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { StorageService } from '../../services/storage.service';
import { ConversionHistory } from '../../models/currency.model';

@Component({
  selector: 'app-conversion-history',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './conversion-history.component.html',
  styleUrls: ['./conversion-history.component.scss']
})
export class ConversionHistoryComponent implements OnInit, OnDestroy {
  history: ConversionHistory[] = [];
  private intervalId: any;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.loadHistory();
    
    // Listen for storage changes (in case of multiple tabs)
    window.addEventListener('storage', () => {
      this.loadHistory();
    });
    
    // Poll for history updates every second (for same-tab updates)
    this.intervalId = setInterval(() => {
      this.loadHistory();
    }, 1000);
  }
  
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadHistory() {
    this.history = this.storageService.getHistory();
  }

  deleteItem(id: string) {
    this.storageService.deleteHistoryItem(id);
    this.loadHistory();
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all conversion history?')) {
      this.storageService.clearHistory();
      this.loadHistory();
    }
  }

  formatCurrency(amount: number, currencyCode: string): string {
    if (!amount || !currencyCode) {
      return 'N/A';
    }
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
      }).format(amount);
    } catch {
      return `${amount} ${currencyCode}`;
    }
  }

  formatDateTime(timestamp: string): string {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
