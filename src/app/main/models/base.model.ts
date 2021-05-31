import { Timestamp } from '@firebase/firestore-types';

export interface BaseModel {
  id: string;
  date: Timestamp;
  value: number;
}
