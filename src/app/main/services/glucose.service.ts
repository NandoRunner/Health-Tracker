import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class GlucoseService extends BaseService {
  
  constructor(authService: AuthService, db: AngularFirestore) {
    super(authService, db);
    this.serviceName = "Glucose";
    this.collectionName = 'glucoses';
    this.init();
  }
}
  
