import { HttpService } from '@nestjs/axios';
import { Get, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CombinedService {
  constructor(private readonly httpService: HttpService) {}

  async getCombinedData() {
    const apiUsers = 'https://jsonplaceholder.typicode.com/users/1';
    const apiCatFact = 'https://catfact.ninja/fact';
    const apiDogImage = 'https://dog.ceo/api/breeds/image/random';

    try {
      // fetch sekaligus
      const [userRes, catRes, dogRes] = await Promise.all([
        firstValueFrom(this.httpService.get(apiUsers)),
        firstValueFrom(this.httpService.get(apiCatFact)),
        firstValueFrom(this.httpService.get(apiDogImage)),
      ]);

      return {
        timestamp: new Date().toISOString(),
        content: {
          profile: userRes.data,
          fact: catRes.data.fact,
          image: dogRes.data.message,
        },
      };
    } catch (error) {
      throw new Error('Failed to fetch data from API');
    }
  }
}
