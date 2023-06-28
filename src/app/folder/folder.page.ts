import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {first, Subject} from "rxjs";

export interface Entry {
  created: Date;
  id: string;
}

export interface TimeSpan {
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {


  constructor() { }

  ngOnInit() {
  }
}
