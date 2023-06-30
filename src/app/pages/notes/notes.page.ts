import { Component, OnInit } from '@angular/core';
import {Note, NotesService} from "../../services/notes.service";
import {map} from "rxjs";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})

export class NotesPage implements OnInit {

  note: Note = new Note();
  notesList: any[] = [];
  constructor(private noteService: NotesService, private alertCtrl: AlertController) { }

  ngOnInit() {
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

  async showAddItemDialog(){
    const alert: HTMLIonAlertElement = await this.alertCtrl.create(
      {
        header: 'Création d\'une nouvelle note',
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel'
          },
          {
            text: 'Valider',
            handler: (data) => {
              this.noteService.create(data);
            }
          }
        ],
        inputs: [
          {
            name: 'title',
            type: 'text',
            placeholder: 'Endroit visité'
          },
          {
            name: 'dateBegin',
            type: 'date',
            placeholder: 'Date de début'
          },
          {
            name: 'dateEnd',
            type: 'date',
            placeholder: 'Date de fin'
          },
          {
            name: 'desc',
            type: 'textarea',
            placeholder: 'Description du voyage'
          },
          {
            name: 'latitude',
            type: 'number',
            placeholder: 'latitude de la position'
          },
          {
            name: 'longitude',
            type: 'number',
            placeholder: 'longitude de la position'
          }
        ],
        message: 'Pour trouver la latitude et la longitude de la destination : https://www.coordonnees-gps.fr/'
      }
    );
    alert.present();
  }

  async showUpdateItemDialog(note: any){
    const alert: HTMLIonAlertElement = await this.alertCtrl.create(
      {
        header: "Modification d'une note",
        buttons: [
          {
            text: "Annuler",
            role: "cancel"
          },
          {
            text: "Valider",
            handler: (data) => {
              data.key = note.key;
              this.noteService.update(data.key, data);
            }
          }
        ],
        inputs: [
          {
            name: 'title',
            type: 'text',
            placeholder: 'Endroit visité',
            value: note.title
          },
          {
            name: 'dateBegin',
            type: 'date',
            placeholder: 'Date de début',
            value: note.dateBegin
          },
          {
            name: 'dateEnd',
            type: 'date',
            placeholder: 'Date de fin',
            value: note.dateEnd
          },
          {
            name: 'desc',
            type: 'textarea',
            placeholder: 'Description du voyage',
            value: note.desc
          },
          {
            name: 'latitude',
            type: 'number',
            placeholder: 'latitude de la position',
            value: note.latitude
          },
          {
            name: 'longitude',
            type: 'number',
            placeholder: 'longitude de la position',
            value: note.longitude
          }
        ]
      }
    );
    alert.present();
  }

  deleteNote(key: string){
    this.noteService.delete(key);
  }

}
