import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
// i
export class CardComponent {
  @Input() countryData: string = 'Label';
  @Input() customText: string = 'Response';
}

