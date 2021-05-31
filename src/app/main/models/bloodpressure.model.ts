import { BaseModel } from './base.model';

export interface BloodPressure extends BaseModel {
  value2: number;
  value3: number;
  value4?: number;
  obs?: string;
}


