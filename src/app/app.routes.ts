import { Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';

export const routeConfig: Routes = [
    { path: '', redirectTo: '/map', pathMatch: 'full' }, // index route
    { path: 'map', component: MapComponent }, // map route
    { path: '**', redirectTo: '/map' }, // any path redirects to map 
];
