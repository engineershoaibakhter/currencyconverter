import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CurrencyService } from '../../services/currency.service';
import { StorageService } from '../../services/storage.service';
import { ConversionHistory } from '../../models/currency.model';
import { NumbersOnlyDirective } from '../../directives/numbers-only.directive';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule,
    NumbersOnlyDirective
  ],
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  converterForm!: FormGroup;
  currencies: any[] = [];
  loading = false;
  loadingCurrencies = false;
  result: any = null;
  maxDate = new Date();

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadCurrencies();
  }

  initForm() {
    this.converterForm = this.fb.group({
      fromCurrency: ['USD', Validators.required],
      toCurrency: ['EUR', Validators.required],
      amount: [1, [Validators.required, Validators.min(0.01)]],
      date: [null]
    });
  }

  loadCurrencies() {
    this.loadingCurrencies = true;
    this.currencyService.getCurrencies().subscribe({
      next: (response) => {
        if (response.data) {
          this.currencies = Object.keys(response.data).map(key => ({
            code: key,
            name: response.data[key].name
          }));
        }
        this.loadingCurrencies = false;
      },
      error: (error) => {
        console.error('Error loading currencies:', error);
        this.loadingCurrencies = false;
        // Fallback to common currencies
        this.currencies = this.getCommonCurrencies();
      }
    });
  }

  getCommonCurrencies() {
    return [
      { code: 'USD', name: 'US Dollar' },
      { code: 'EUR', name: 'Euro' },
      { code: 'GBP', name: 'British Pound' },
      { code: 'JPY', name: 'Japanese Yen' },
      { code: 'AUD', name: 'Australian Dollar' },
      { code: 'CAD', name: 'Canadian Dollar' },
      { code: 'CHF', name: 'Swiss Franc' },
      { code: 'CNY', name: 'Chinese Yuan' },
      { code: 'INR', name: 'Indian Rupee' },
      { code: 'MXN', name: 'Mexican Peso' }
    ];
  }

  convert() {
    if (this.converterForm.invalid) return;

    const { fromCurrency, toCurrency, amount, date } = this.converterForm.value;
    
    // Check if date is a past date (not today) - show alert for paid feature
    if (date) {
      const selectedDate = new Date(date);
      const today = new Date();
      // Reset time to compare only dates
      selectedDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        alert('⚠️ Historical rates are only available on paid plans.\n\nPlease remove the date or select today\'s date to use current rates, or upgrade your plan at freecurrencyapi.com');
        return;
      }
    }

    this.loading = true;
    this.result = null;

    this.currencyService.convertCurrency(fromCurrency, toCurrency, amount).subscribe({
      next: (response) => {
        this.result = {
          ...response,
          rate: response.rate || 0,
          convertedAmount: response.convertedAmount || 0
        };
        this.loading = false;
        
        // Save to history
        const historyItem: ConversionHistory = {
          ...this.result,
          timestamp: new Date().toISOString(),
          id: Date.now().toString()
        };
        this.storageService.addToHistory(historyItem);
        
        // Mark form as pristine to re-enable button for new conversions
        this.converterForm.markAsPristine();
      },
      error: (error) => {
        console.error('Error converting currency:', error);
        this.loading = false;
        
        // More helpful error message
        if (error.status === 0) {
          alert('⚠️ Unable to connect to server.\n\nThe server might be waking up (takes ~30 seconds on free tier). Please try again in a moment.');
        } else if (error.status === 401) {
          alert('⚠️ API authentication error. Please contact support.');
        } else {
          alert('Error converting currency. Please try again.');
        }
      }
    });
  }

  swapCurrencies() {
    const from = this.converterForm.get('fromCurrency')?.value;
    const to = this.converterForm.get('toCurrency')?.value;
    
    this.converterForm.patchValue({
      fromCurrency: to,
      toCurrency: from
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
}
