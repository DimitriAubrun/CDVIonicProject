import { Component, OnInit } from '@angular/core';
import {Note, NotesService} from "../../services/notes.service";
import {map} from "rxjs";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})

export class NotesPage implements OnInit {

  note: Note = new Note();
  notesList: any[] = [];
  constructor(private noteService: NotesService) { }

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

  saveNote(){
    if(this.note.isValid()){
      let operation: any;
      if(this.note.key){
        operation = this.noteService.update(
          this.note.key, {
            title: this.note.title, dateBegin: this.note.dateBegin, dateEnd: this.note.dateEnd
          }
        );
      }else{
        operation = this.noteService.create(this.note)
      }
      operation.then(()=> {
        this.note = new Note()
      });
    }
  }

  setNote(data: any){
    this.note = new Note();
    this.note.key = data.key;
    this.note.dateBegin = data.dateBegin;
    this.note.dateEnd = data.dateEnd;
    this.note.title = data.title;
  }

  deleteNote(key: string){
    this.noteService.delete(key);
  }

}
