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
        // Handle both formats: { data: {...} } or direct object
        const currencyData = response.data || response;
        if (currencyData && typeof currencyData === 'object') {
          this.currencies = Object.keys(currencyData).map(key => ({
            code: key,
            name: currencyData[key]?.name || key
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
      { code: 'AED', name: 'United Arab Emirates Dirham' },
      { code: 'AFN', name: 'Afghan Afghani' },
      { code: 'ALL', name: 'Albanian Lek' },
      { code: 'AMD', name: 'Armenian Dram' },
      { code: 'ANG', name: 'Netherlands Antillean Guilder' },
      { code: 'AOA', name: 'Angolan Kwanza' },
      { code: 'ARS', name: 'Argentine Peso' },
      { code: 'AUD', name: 'Australian Dollar' },
      { code: 'AWG', name: 'Aruban Florin' },
      { code: 'AZN', name: 'Azerbaijani Manat' },
      { code: 'BAM', name: 'Bosnia and Herzegovina Convertible Mark' },
      { code: 'BBD', name: 'Barbadian Dollar' },
      { code: 'BDT', name: 'Bangladeshi Taka' },
      { code: 'BGN', name: 'Bulgarian Lev' },
      { code: 'BHD', name: 'Bahraini Dinar' },
      { code: 'BIF', name: 'Burundian Franc' },
      { code: 'BMD', name: 'Bermudian Dollar' },
      { code: 'BND', name: 'Brunei Dollar' },
      { code: 'BOB', name: 'Bolivian Boliviano' },
      { code: 'BRL', name: 'Brazilian Real' },
      { code: 'BSD', name: 'Bahamian Dollar' },
      { code: 'BTN', name: 'Bhutanese Ngultrum' },
      { code: 'BWP', name: 'Botswanan Pula' },
      { code: 'BYN', name: 'Belarusian Ruble' },
      { code: 'BZD', name: 'Belize Dollar' },
      { code: 'CAD', name: 'Canadian Dollar' },
      { code: 'CDF', name: 'Congolese Franc' },
      { code: 'CHF', name: 'Swiss Franc' },
      { code: 'CLP', name: 'Chilean Peso' },
      { code: 'CNY', name: 'Chinese Yuan' },
      { code: 'COP', name: 'Colombian Peso' },
      { code: 'CRC', name: 'Costa Rican Colon' },
      { code: 'CUP', name: 'Cuban Peso' },
      { code: 'CVE', name: 'Cape Verdean Escudo' },
      { code: 'CZK', name: 'Czech Koruna' },
      { code: 'DJF', name: 'Djiboutian Franc' },
      { code: 'DKK', name: 'Danish Krone' },
      { code: 'DOP', name: 'Dominican Peso' },
      { code: 'DZD', name: 'Algerian Dinar' },
      { code: 'EGP', name: 'Egyptian Pound' },
      { code: 'ERN', name: 'Eritrean Nakfa' },
      { code: 'ETB', name: 'Ethiopian Birr' },
      { code: 'EUR', name: 'Euro' },
      { code: 'FJD', name: 'Fijian Dollar' },
      { code: 'FKP', name: 'Falkland Islands Pound' },
      { code: 'FOK', name: 'Faroese Krona' },
      { code: 'GBP', name: 'British Pound' },
      { code: 'GEL', name: 'Georgian Lari' },
      { code: 'GGP', name: 'Guernsey Pound' },
      { code: 'GHS', name: 'Ghanaian Cedi' },
      { code: 'GIP', name: 'Gibraltar Pound' },
      { code: 'GMD', name: 'Gambian Dalasi' },
      { code: 'GNF', name: 'Guinean Franc' },
      { code: 'GTQ', name: 'Guatemalan Quetzal' },
      { code: 'GYD', name: 'Guyanese Dollar' },
      { code: 'HKD', name: 'Hong Kong Dollar' },
      { code: 'HNL', name: 'Honduran Lempira' },
      { code: 'HRK', name: 'Croatian Kuna' },
      { code: 'HTG', name: 'Haitian Gourde' },
      { code: 'HUF', name: 'Hungarian Forint' },
      { code: 'IDR', name: 'Indonesian Rupiah' },
      { code: 'ILS', name: 'Israeli New Shekel' },
      { code: 'IMP', name: 'Isle of Man Pound' },
      { code: 'INR', name: 'Indian Rupee' },
      { code: 'IQD', name: 'Iraqi Dinar' },
      { code: 'IRR', name: 'Iranian Rial' },
      { code: 'ISK', name: 'Icelandic Krona' },
      { code: 'JEP', name: 'Jersey Pound' },
      { code: 'JMD', name: 'Jamaican Dollar' },
      { code: 'JOD', name: 'Jordanian Dinar' },
      { code: 'JPY', name: 'Japanese Yen' },
      { code: 'KES', name: 'Kenyan Shilling' },
      { code: 'KGS', name: 'Kyrgyzstani Som' },
      { code: 'KHR', name: 'Cambodian Riel' },
      { code: 'KMF', name: 'Comorian Franc' },
      { code: 'KPW', name: 'North Korean Won' },
      { code: 'KRW', name: 'South Korean Won' },
      { code: 'KWD', name: 'Kuwaiti Dinar' },
      { code: 'KYD', name: 'Cayman Islands Dollar' },
      { code: 'KZT', name: 'Kazakhstani Tenge' },
      { code: 'LAK', name: 'Laotian Kip' },
      { code: 'LBP', name: 'Lebanese Pound' },
      { code: 'LKR', name: 'Sri Lankan Rupee' },
      { code: 'LRD', name: 'Liberian Dollar' },
      { code: 'LSL', name: 'Lesotho Loti' },
      { code: 'LYD', name: 'Libyan Dinar' },
      { code: 'MAD', name: 'Moroccan Dirham' },
      { code: 'MDL', name: 'Moldovan Leu' },
      { code: 'MGA', name: 'Malagasy Ariary' },
      { code: 'MKD', name: 'Macedonian Denar' },
      { code: 'MMK', name: 'Myanmar Kyat' },
      { code: 'MNT', name: 'Mongolian Tugrik' },
      { code: 'MOP', name: 'Macanese Pataca' },
      { code: 'MRU', name: 'Mauritanian Ouguiya' },
      { code: 'MUR', name: 'Mauritian Rupee' },
      { code: 'MVR', name: 'Maldivian Rufiyaa' },
      { code: 'MWK', name: 'Malawian Kwacha' },
      { code: 'MXN', name: 'Mexican Peso' },
      { code: 'MYR', name: 'Malaysian Ringgit' },
      { code: 'MZN', name: 'Mozambican Metical' },
      { code: 'NAD', name: 'Namibian Dollar' },
      { code: 'NGN', name: 'Nigerian Naira' },
      { code: 'NIO', name: 'Nicaraguan Cordoba' },
      { code: 'NOK', name: 'Norwegian Krone' },
      { code: 'NPR', name: 'Nepalese Rupee' },
      { code: 'NZD', name: 'New Zealand Dollar' },
      { code: 'OMR', name: 'Omani Rial' },
      { code: 'PAB', name: 'Panamanian Balboa' },
      { code: 'PEN', name: 'Peruvian Sol' },
      { code: 'PGK', name: 'Papua New Guinean Kina' },
      { code: 'PHP', name: 'Philippine Peso' },
      { code: 'PKR', name: 'Pakistani Rupee' },
      { code: 'PLN', name: 'Polish Zloty' },
      { code: 'PYG', name: 'Paraguayan Guarani' },
      { code: 'QAR', name: 'Qatari Riyal' },
      { code: 'RON', name: 'Romanian Leu' },
      { code: 'RSD', name: 'Serbian Dinar' },
      { code: 'RUB', name: 'Russian Ruble' },
      { code: 'RWF', name: 'Rwandan Franc' },
      { code: 'SAR', name: 'Saudi Riyal' },
      { code: 'SBD', name: 'Solomon Islands Dollar' },
      { code: 'SCR', name: 'Seychellois Rupee' },
      { code: 'SDG', name: 'Sudanese Pound' },
      { code: 'SEK', name: 'Swedish Krona' },
      { code: 'SGD', name: 'Singapore Dollar' },
      { code: 'SHP', name: 'Saint Helena Pound' },
      { code: 'SLE', name: 'Sierra Leonean Leone' },
      { code: 'SOS', name: 'Somali Shilling' },
      { code: 'SRD', name: 'Surinamese Dollar' },
      { code: 'SSP', name: 'South Sudanese Pound' },
      { code: 'STN', name: 'Sao Tome and Principe Dobra' },
      { code: 'SVC', name: 'Salvadoran Colon' },
      { code: 'SYP', name: 'Syrian Pound' },
      { code: 'SZL', name: 'Eswatini Lilangeni' },
      { code: 'THB', name: 'Thai Baht' },
      { code: 'TJS', name: 'Tajikistani Somoni' },
      { code: 'TMT', name: 'Turkmenistani Manat' },
      { code: 'TND', name: 'Tunisian Dinar' },
      { code: 'TOP', name: 'Tongan Paanga' },
      { code: 'TRY', name: 'Turkish Lira' },
      { code: 'TTD', name: 'Trinidad and Tobago Dollar' },
      { code: 'TVD', name: 'Tuvaluan Dollar' },
      { code: 'TWD', name: 'New Taiwan Dollar' },
      { code: 'TZS', name: 'Tanzanian Shilling' },
      { code: 'UAH', name: 'Ukrainian Hryvnia' },
      { code: 'UGX', name: 'Ugandan Shilling' },
      { code: 'USD', name: 'US Dollar' },
      { code: 'UYU', name: 'Uruguayan Peso' },
      { code: 'UZS', name: 'Uzbekistan Som' },
      { code: 'VES', name: 'Venezuelan Bolivar Soberano' },
      { code: 'VND', name: 'Vietnamese Dong' },
      { code: 'VUV', name: 'Vanuatu Vatu' },
      { code: 'WST', name: 'Samoan Tala' },
      { code: 'XAF', name: 'Central African CFA Franc' },
      { code: 'XCD', name: 'East Caribbean Dollar' },
      { code: 'XDR', name: 'IMF Special Drawing Rights' },
      { code: 'XOF', name: 'West African CFA Franc' },
      { code: 'XPF', name: 'CFP Franc' },
      { code: 'YER', name: 'Yemeni Rial' },
      { code: 'ZAR', name: 'South African Rand' },
      { code: 'ZMW', name: 'Zambian Kwacha' },
      { code: 'ZWL', name: 'Zimbabwean Dollar' }
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
