import {Component, inject} from '@angular/core';
import {Note} from "./note/note";
import { MatDialog } from '@angular/material/dialog';
import {FormComponent, FormDialogResult} from "./form/form.component";
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {Observable} from "rxjs";
import { BehaviorSubject } from 'rxjs';
import firebase from  "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;

//Функция для получения наблюдаемого объекта из Firebase
const getObservable = (collection: AngularFirestoreCollection<Note>) => {
  const subject = new BehaviorSubject<Note[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Note[]) => {
    subject.next(val);
  });
  return subject;
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dialog: MatDialog, private store: AngularFirestore) {}
  //Сохдаем текущую дату для записи в объект Note
  data = new Date();
  //Получаем и записываем в notes данные из Firebase
  notes = getObservable(this.store.collection('notes', ref => ref.orderBy('date', "desc"))) as Observable<Note[]>

  //Функция которая вызывает модальное окно редактирования текущей записи, после закрытия окна записывает обновленные данные в коллекцию Firebase
  editNote(note: Note): void {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        note
      },
    });
    dialogRef.afterClosed().subscribe((result: FormDialogResult|undefined) => {
      if (!result) {
        return;
      }
      this.store.collection('notes').doc(note.id).update(note)
        .then()
        .catch(err => console.log(err))
    });
  }

  //Фуекция, которая удаляет запись из firebase, получает как параметр запись которую надо удалить
  deleteNote(note: Note): void {
    this.store.collection('notes').doc(note.id).delete()
      .then()
      .catch(err => console.log(err))
  }

//Функция открывает диалоговое окно для создания новой записи и записи ее в коллекцию firebase
  newNote(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        note: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: FormDialogResult|undefined) => {
        if (!result?.note.name||!result?.note.description) {
          return;
        }
        result.note.date =  Timestamp.fromDate(new Date());
        this.store.collection('notes').add(result.note)
          .then()
          .catch(err => console.log(err))
      });
  }

}
