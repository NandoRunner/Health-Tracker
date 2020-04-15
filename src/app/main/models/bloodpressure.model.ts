import { Timestamp } from '@firebase/firestore-types';

export interface BloodPressure {
  id: string;
  date: Timestamp;
  valueMax: number;
  valueMin: number;
  heartRate: number;
}


