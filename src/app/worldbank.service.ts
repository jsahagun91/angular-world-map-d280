import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorldbankService {

  constructor(private http: HttpClient) { }

  getCountryInfo(countryName: string) {
    return this.http.get(
      'https://api.worldbank.org/v2/country/${countryName}?format=json'
    )''
  }
}

