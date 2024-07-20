import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { WorldbankService } from '../../worldbank.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [NavbarComponent, MatIconModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  countryName: string = '';
  region: string = '';
  incomeLevel = '';
  longitude: string = '';
  latitude: string = '';

  constructor(
    private worldbankService: WorldbankService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private http: HttpClient 
  ) {

    this.matIconRegistry.addSvgIcon(
      'map_icon',
      this.domSanitizer.bypassSecurityTrustUrl(
        '../../../assets/images/map-image.svg'
      )
    );
  }

  mapPathHover(event: MouseEvent) {
    const target = event.target as SVGElement;
    if (target && target.nodeName === 'path') {
      target.style.fill = 'orange';
    }
  }

  mapPathLeave(event: MouseEvent) {
    const target = event.target as SVGElement;
    if (target && target.nodeName === 'path') {
      target.style.fill = 'white';
    }
  }

  mapPathClick(event: MouseEvent) {
    const target = event.target as SVGElement;
    if (target && target.nodeName === 'path') {
      const countryName = target.id;

      this.worldbankService.getCountryInfo(countryName).subscribe(
        (response: any) => {
          if (
            Array.isArray(response) &&
            response.length > 1 &&
            Array.isArray(response[1]) &&
            response[1].length > 0
          ) {
            const countryData = response[1][0];

            this.countryName = countryData.name;
            this.region = countryData.region.value;
            this.incomeLevel = countryData.incomeLevel.value;
            this.longitude = countryData.longitude;
            this.latitude = countryData.latitude;
          } else {
            console.warn('API response is not as expected:', response);
          }
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
    }
  }
}
