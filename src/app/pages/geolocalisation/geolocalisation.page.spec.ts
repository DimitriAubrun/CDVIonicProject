import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeolocalisationPage } from './geolocalisation.page';

describe('GeolocalisationPage', () => {
  let component: GeolocalisationPage;
  let fixture: ComponentFixture<GeolocalisationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GeolocalisationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
