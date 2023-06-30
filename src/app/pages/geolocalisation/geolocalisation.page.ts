import {Component, OnDestroy, OnInit} from '@angular/core';
import {Map, tileLayer, marker, icon, LatLngExpression} from 'leaflet';
import {Note, NotesService} from "../../services/notes.service";
import {map} from "rxjs";
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-geolocalisation',
  templateUrl: './geolocalisation.page.html',
  styleUrls: ['./geolocalisation.page.scss'],
})
export class GeolocalisationPage implements OnInit {

  note: Note = new Note();
  notesList: any[] = [];

  coords: any;
  public map!: Map;

  constructor(private noteService: NotesService) { }

  ionViewDidEnter(){
    this.map = new Map('mapView');
  }
  ngOnInit() {
    this.getCurrentLocation();
    this.noteService.getAll().snapshotChanges().pipe(
      map(
        (changes: any) => {
          return changes.map((item: any) => {
            return {key: item.payload.key, ...item.payload.val()}
          })
        }
      )
    ).subscribe(
      (data) => this.notesList = data
    );
  }

  async getCurrentLocation() {
    try {

      const allowedToLocate = await Geolocation.checkPermissions();
      if (!allowedToLocate) {
        await Geolocation.requestPermissions({
          permissions: ['location', 'coarseLocation']
        });
      }

      const pos = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true
      });

      for(let note of this.notesList){
        let i = 0;
        this.leafLetInit(pos.coords, this.notesList[i]);

        i++;
      }
    } catch (error) {
      console.log(error);
    }
  }

  leafLetInit(coords: any, data: any){
    const origin: LatLngExpression = [coords.latitude, coords.longitude];
    this.map.setView(origin, 4);

    const markerIcon = icon({
      iconUrl: 'assets/icon/favicon.png',
      iconSize: [30, 30]
    });

    const newMarkerOrigin = marker(origin, {
      icon: markerIcon,
      title: 'Vous êtes ici...',
      draggable: true
    });

    for(let note of this.notesList){

      const newMarker = marker([note.latitude, note.longitude],{
          icon: markerIcon,
          title: 'Vous êtes ici...',
          draggable: true
        }
      );

      newMarker.addTo(this.map);
    }

    newMarkerOrigin.addTo(this.map);


    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.map.on('click', (even) => console.log(even));
  }

}
