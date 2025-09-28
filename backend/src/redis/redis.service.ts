import { Injectable, Inject } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private readonly redisClient: any;

  constructor(
    @Inject('REDIS_CLIENT')
    redisClient: any,
  ) {
    this.redisClient = redisClient;
  }

  async set(key: string, value: string, expireInSeconds?: number): Promise<void> {
    if (expireInSeconds) {
      await this.redisClient.setEx(key, expireInSeconds, value);
    } else {
      await this.redisClient.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redisClient.exists(key);
    return result === 1;
  }

  async setMarketData(symbol: string, data: any, expireInSeconds = 300): Promise<void> {
    const key = `market_data:${symbol}`;
    await this.set(key, JSON.stringify(data), expireInSeconds);
  }

  async getMarketData(symbol: string): Promise<any | null> {
    const key = `market_data:${symbol}`;
    const data = await this.get(key);
    return data ? JSON.parse(data) : null;
  }
}