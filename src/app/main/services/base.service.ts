import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { Firestore } from 'src/app/core/classes/firestore.class';

import { FireBoost } from 'fireboost';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends { id: string }> extends Firestore<T> {

  collectionName: string;

  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);

    console.log('BaseService constructor');
   
    //this.init();
  }

  protected init(): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.setCollection(`/users/${user.uid}/${this.collectionName}`, ref =>
          ref.orderBy('date', 'desc')
        );
        return;
      }
      this.setCollection(null);
    });
  }
}
