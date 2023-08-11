import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Note} from "./note";
import {OutputData} from "@editorjs/editorjs";
import edjsHTML from "editorjs-html";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  //Компонент принимает запись и возвращает EventEmmiter для конкретной Note для двух функций: редактирования и удаления.
  @Input() note: Note | null = null;
  @Output() edit = new EventEmitter<Note>();
  @Output() delete = new EventEmitter<Note>();

  //Функция, которая парсит OutputData из EditorJS в HTML код, для отображения записи
  parseDescription(description: OutputData | undefined) {
    const edjsParser = edjsHTML();
    if (description) {
      const blockHTML = edjsParser.parse(description);
      return blockHTML.join(' ')
    }
    return ''
  }
}
