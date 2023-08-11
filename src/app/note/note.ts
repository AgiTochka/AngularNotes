import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import FieldValue = firebase.firestore.FieldValue;
import {OutputData} from "@editorjs/editorjs";


export interface Note {
  id?: string;
  date: Timestamp;
  name: string;
  description: OutputData;
}
