import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseService } from './base.service';
import { Weight } from '../models/weight.model';

@Injectable({
  providedIn: 'root'
})
export class WeightService extends BaseService<Weight> {
  
  constructor(authService: AuthService, db: AngularFirestore) {
    super(authService, db);
    this.collectionName = 'weights';
    this.init();
  }
}
