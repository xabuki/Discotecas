import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DiscocrudService {

  constructor(
    private firestore: AngularFirestore
    ) { }
    create_Disco(record) {
    return this.firestore.collection('discotecas').add(record);
    }
    read_Discos() {
    return this.firestore.collection('discotecas').snapshotChanges();
    }
    update_Disco(recordID, record) {
    this.firestore.doc('discotecas/' + recordID).update(record);
    }
    delete_Disco(record_id) {
    this.firestore.doc('discotecas/' + record_id).delete();
    }
    select_Disco(id){
      return this.firestore.doc('discotecas/'+ id).get();
    }
   }

