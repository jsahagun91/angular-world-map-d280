import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';


// Routes configuration
const routes: Routes = [
    { path: '', redirectTo: '/map', pathMatch: 'full' },
    { path: 'map', component: MapComponent },
    { path: '**', redirectTo: '/map '}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule { }