import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorldbankService {

  constructor(private http: HttpClient) { }

  getCountryInfo(countryName: string) {
    return this.http.get(
      'https://api.worldbank.org/v2/country/${countryName}?format=json'
    );
  }

  setCountryInfo(countryName: string, countryData: any) {
    return this.getCountryInfo(countryName).subscribe(
      (response: any) => {
        if (
          Array.isArray(response) &&
          response.length > 1 &&
          Array.isArray(response[1]) &&
          response[1].length > 0 
        ) {
          countryData = response[1][0]; // Assign fetched data to the local variable
        } else {
          console.warn('Unexpected API response structure:', response);
        }
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }
}