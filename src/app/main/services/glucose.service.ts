import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseService } from './base.service';
import { Glucose } from '../models/glucose.model';

@Injectable({
  providedIn: 'root'
})
export class GlucoseService extends BaseService<Glucose> {
  
  constructor(authService: AuthService, db: AngularFirestore) {
    super(authService, db);
    this.collectionName = 'glucoses';
    this.init();
  }
}
  
