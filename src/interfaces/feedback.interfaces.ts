export interface IFeedbackRequest {
  note?: number
  comment?: string
}

export interface IServiceFeedbackRequest extends IFeedbackRequest {
  providerId: string
  serviceId: string
}

export interface IUserFeedbackRequest extends IFeedbackRequest {
  userId: string
}
