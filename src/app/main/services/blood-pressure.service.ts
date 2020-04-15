import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { BloodPressure } from '../models/bloodpressure.model';

@Injectable({
  providedIn: 'root'
})
export class BloodPressureService extends Firestore<BloodPressure> {
  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
  }

  private init(): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.setCollection(`/users/${user.uid}/bloodpressures`, ref => ref.orderBy('date', 'desc'));
        return;
      }
      this.setCollection(null);
    });
  }
}
