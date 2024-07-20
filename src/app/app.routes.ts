import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
    { path: '', redirectTo: '/map', pathMatch: 'full' }, // index route
    { path: 'map', component: MapComponent }, // map route
    { path: '**', redirectTo: '/map' }, // any path redirects to map 
];
