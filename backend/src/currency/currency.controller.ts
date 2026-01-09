import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('currencies')
  async getCurrencies() {
    return this.currencyService.getCurrencies();
  }

  @Get('latest')
  async getLatestRates(
    @Query('base_currency') baseCurrency: string,
    @Query('currencies') currencies?: string,
  ) {
    return this.currencyService.getLatestRates(baseCurrency, currencies);
  }

  @Get('historical')
  async getHistoricalRates(
    @Query('date') date: string,
    @Query('base_currency') baseCurrency: string,
    @Query('currencies') currencies?: string,
  ) {
    return this.currencyService.getHistoricalRates(date, baseCurrency, currencies);
  }

  @Get('convert')
  async convertCurrency(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('amount') amount: string,
    @Query('date') date?: string,
  ) {
    return this.currencyService.convertCurrency(
      from,
      to,
      parseFloat(amount),
      date,
    );
  }
}
