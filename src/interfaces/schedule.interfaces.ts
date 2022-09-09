export interface IScheduleRequest {
  hour: Date;
  serviceDate: Date;
  description: string;
  value: number;
  providerId: string;
  addressId: string;
}
