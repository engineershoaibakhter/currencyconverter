import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { ConversionHistoryComponent } from './components/conversion-history/conversion-history.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    CurrencyConverterComponent,
    ConversionHistoryComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Currency Converter';
  currentYear = new Date().getFullYear();
}
