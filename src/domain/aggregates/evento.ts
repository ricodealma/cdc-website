export interface IEvent {
  id: number;
  dateTime: Date;
  title: string;
  description?: string;
  ministryId: number;
  ministry?: any; // TODO: Define IMinistry interface if needed
  createdAt?: Date;
  updatedAt?: Date;
}

export enum Ministries {
  General = 1,
  Intercession,
  Women,
  Children,
  Evangelism,
  Media,
  Worship,
  Youth
}
