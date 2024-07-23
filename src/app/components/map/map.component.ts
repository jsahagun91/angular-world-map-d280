import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { CardComponent } from "../card/card.component";
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { WorldbankService } from '../../worldbank.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule,NavbarComponent, MatIconModule, CardComponent],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  countryClicked: boolean = false;

  onCountryClick() {
    this.countryClicked = true;
  }

  countryName: string = '';
  capitalCity: string = '';
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
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/images/map-image.svg'
      )
    );
  }

  // Fill path orange upon hover
  mapPathHover(event: MouseEvent) {
    const target = event.target as SVGElement;
    if (target && target.nodeName === 'path') {
      target.style.fill = 'orange';
    }
    // Test hover
    // console.log('hover')
  }

  // When mouse leaves fill path back to white
  mapPathLeave(event: MouseEvent) {
    const target = event.target as SVGElement;
    if (target && target.nodeName === 'path') {
      target.style.fill = 'white';
    }
  }

  // Call api when clicked
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

            console.log(response)

            this.countryName = countryData.name;
            this.capitalCity = countryData.capitalCity;
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
     // Call function to remove instructions
    this.onCountryClick();

  }
}
