import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Carnet de voyage', url: '/folder/inbox', icon: 'airplane' },
    { title: 'Notes', url: 'notes', icon: 'chevron-forward' },
    { title: 'carte', url: 'geolocalisation', icon: 'planet' },
  ];

  constructor() {}
}
