import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class MarketDataService {
  private readonly alphaVantageApiKey: string;
  private readonly coinGeckoApiKey: string;
  private readonly alpacaApiKey: string;
  private readonly alpacaSecretKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
    this.alphaVantageApiKey = this.configService.get<string>('ALPHA_VANTAGE_API_KEY') || '';
    this.coinGeckoApiKey = this.configService.get<string>('COINGECKO_API_KEY') || '';
    this.alpacaApiKey = this.configService.get<string>('ALPACA_API_KEY') || '';
    this.alpacaSecretKey = this.configService.get<string>('ALPACA_SECRET_KEY') || '';
  }

  // Get stock quote from Alpha Vantage with Redis caching
  async getStockQuote(symbol: string): Promise<any> {
    // Try to get from cache first
    const cachedData = await this.redisService.getMarketData(`stock:${symbol}`);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.alphaVantageApiKey}`,
        )
      );
      
      // Cache the result for 5 minutes
      await this.redisService.setMarketData(`stock:${symbol}`, response.data, 300);
      
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch stock quote',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Get cryptocurrency data from CoinGecko with Redis caching
  async getCryptoData(symbol: string): Promise<any> {
    // Try to get from cache first
    const cachedData = await this.redisService.getMarketData(`crypto:${symbol}`);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.get(`https://api.coingecko.com/api/v3/coins/${symbol}`)
      );
      
      // Cache the result for 5 minutes
      await this.redisService.setMarketData(`crypto:${symbol}`, response.data, 300);
      
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch cryptocurrency data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Get real-time market data from Alpaca with Redis caching
  async getAlpacaMarketData(symbol: string): Promise<any> {
    // Try to get from cache first
    const cachedData = await this.redisService.getMarketData(`alpaca:${symbol}`);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.get(`https://paper-api.alpaca.markets/v2/assets/${symbol}`, {
          headers: {
            'APCA-API-KEY-ID': this.alpacaApiKey,
            'APCA-API-SECRET-KEY': this.alpacaSecretKey,
          },
        })
      );
      
      // Cache the result for 5 minutes
      await this.redisService.setMarketData(`alpaca:${symbol}`, response.data, 300);
      
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch Alpaca market data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}