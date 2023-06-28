import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeolocalisationPageRoutingModule } from './geolocalisation-routing.module';

import { GeolocalisationPage } from './geolocalisation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeolocalisationPageRoutingModule
  ],
  declarations: [GeolocalisationPage]
})
export class GeolocalisationPageModule {}
