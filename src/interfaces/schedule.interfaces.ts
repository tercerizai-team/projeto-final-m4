export interface IScheduleRequest {
  hour: Date;
  serviceDate: Date;
  description: string;
  value: number;
  providerId: string;
  addressId: string;
}

export interface IScheduleUpdate {
  hour?: Date;
  serviceDate?: Date;
  serviceDescription?: string;
  value?: number;
  finishServiceHour?: Date;
}
