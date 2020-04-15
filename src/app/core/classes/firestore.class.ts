import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import * as firebase from 'firebase/app';

export abstract class Firestore<T extends { id: string }> {
  protected collection: AngularFirestoreCollection<T>;

  constructor(protected db: AngularFirestore) {}

  protected setCollection(path: string, queryFn?: QueryFn): void {
    this.collection = path ? this.db.collection(path, queryFn) : null;
  }

  private setItem(item: T, operation: string): Promise<T> {
    return this.collection
      .doc<T>(item.id)
      [operation](item)
      .then(() => item);
  }

  getAll(): Observable<T[]> {
    return this.collection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as T;
          // const id = a.payload.doc.id;
          return { ...(data as object), id: a.payload.doc.id } as T;
        })
      )
    );
  }

  getByParent(path: string, queryFn?: QueryFn): Observable<T[]> {
    let c: AngularFirestoreCollection<T>;
    c = path ? this.db.collection(path, queryFn) : null;
    return c.valueChanges();
  }

  getByParentWithId(path: string, queryFn?: QueryFn): Observable<T[]> {
    let c: AngularFirestoreCollection<T>;
    c = path ? this.db.collection(path, queryFn) : null;
    return c.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as T;
          // const id = a.payload.doc.id;
          return { ...(data as object), id: a.payload.doc.id } as T;
        })
      )
    );
  }

  get(id: string): Observable<T> {
    return this.collection.doc<T>(id).valueChanges();
  }

  create(item: T): Promise<T> {
    item.id = this.db.createId();
    return this.setItem(item, 'set');
  }

  update(item: T): Promise<T> {
    return this.setItem(item, 'update');
  }

  delete(item: T): Promise<void> {
    return this.collection.doc<T>(item.id).delete();
  }

  deleteFieldId(id: string): void {
    const remove = this.collection.doc(id).update({
      id: firebase.firestore.FieldValue.delete()
    });
  }
}
