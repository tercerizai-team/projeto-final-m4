export interface IServiceUpdateRequest {
  isServiceFinished?: boolean;
  isServiceCanceled?: boolean;
  clientFinished?: boolean;
  providerFinished?: boolean;
}
