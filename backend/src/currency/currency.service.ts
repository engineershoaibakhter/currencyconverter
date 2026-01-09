import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrencyService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('CURRENCY_API_KEY');
    this.baseUrl = this.configService.get<string>('CURRENCY_API_BASE_URL');
  }

  async getCurrencies() {
    try {
      const url = `${this.baseUrl}/currencies?apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to fetch currencies',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getLatestRates(baseCurrency: string, currencies?: string) {
    try {
      let url = `${this.baseUrl}/latest?apikey=${this.apiKey}&base_currency=${baseCurrency}`;
      if (currencies) {
        url += `&currencies=${currencies}`;
      }
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to fetch latest rates',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getHistoricalRates(date: string, baseCurrency: string, currencies?: string) {
    try {
      let url = `${this.baseUrl}/historical?apikey=${this.apiKey}&date=${date}&base_currency=${baseCurrency}`;
      if (currencies) {
        url += `&currencies=${currencies}`;
      }
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to fetch historical rates',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async convertCurrency(
    fromCurrency: string,
    toCurrency: string,
    amount: number,
    date?: string,
  ) {
    try {
      // If date is provided, reject with message about paid tier
      if (date) {
        throw new HttpException(
          {
            message: 'Historical rates are only available on paid plans. Please remove the date to use current rates, or upgrade your plan at freecurrencyapi.com',
            isPaidFeature: true,
          },
          HttpStatus.PAYMENT_REQUIRED,
        );
      }

      const ratesData = await this.getLatestRates(fromCurrency, toCurrency);
      const rate = ratesData.data[toCurrency];
      const convertedAmount = amount * rate;

      return {
        from: fromCurrency,
        to: toCurrency,
        amount: amount,
        convertedAmount: convertedAmount,
        rate: rate,
        date: new Date().toISOString().split('T')[0],
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error.response?.data || 'Failed to convert currency',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
