import {Component, ElementRef, EventEmitter, Inject, Output, ViewChild} from '@angular/core';
import {Note} from "../note/note";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import EditorJS, {OutputData} from "@editorjs/editorjs";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Raw from "@editorjs/raw";
// @ts-ignore
import Quote from "@editorjs/quote";
// @ts-ignore
import Underline from "@editorjs/underline";
import edjsHTML from "editorjs-html";

export interface FormDialogData {
  note: Partial<Note>;
  enableDelete: boolean;
}

export interface FormDialogResult {
  note: Note;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  //запоминаем что было в записи до редактирования, чтобы вернуть прошлые данные если изменений не будет.
  private backupNote: Partial<Note> = {...this.data.note};

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData
  ) {}
  //Создаем эдитор
  @ViewChild('editor', {read: ElementRef})
  editorElement: ElementRef | undefined;
  private editor: EditorJS | undefined;


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initializeEditor();
  }
  //Функция инициализации эдитора, здесь задаем настройки и передаем данные для отображения текста для редактирования.
  private initializeEditor() {
    this.editor = new EditorJS({
      minHeight: 200,
      holder: this.editorElement?.nativeElement,
      tools: {
        header: Header,
        list: List,
        raw: Raw,
        quote: Quote,
        underline: Underline,
      },
      data: this.data.note.description,
    });
  }

  //Сохраняем данные из эдитора в перемнную описания записи
  saveEditorData() {
    const edjsParser = edjsHTML();
    this.editor?.save().then(data => {
      this.data.note.description = data;
    })
  }

  //после закрытия возвращаем данные из бэкапа.
  close(): void {
    this.data.note.name = this.backupNote.name;
    this.data.note.description = this.backupNote.description;
    this.dialogRef.close(this.data);
  }

  protected readonly JSON = JSON;
}
