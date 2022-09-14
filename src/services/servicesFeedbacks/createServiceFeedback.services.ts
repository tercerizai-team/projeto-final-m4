import AppDataSource from "../../data-source";
import { Providers } from "../../entities/providers.entity";
import { Services } from "../../entities/services.entity";
import { ServicesFeedbacks } from "../../entities/services_feedbacks.entity";
import { Users } from "../../entities/users.entity";
import AppError from "../../errors/AppError";
import { IServiceFeedbackRequest } from "../../interfaces/feedback.interfaces";

const createServiceFeedbackService = async (
  { note, comment, serviceId, providerId }: IServiceFeedbackRequest,
  userId: string
) => {
  const servicesFeedbacksRepository =
    AppDataSource.getRepository(ServicesFeedbacks);
  const providersRepository = AppDataSource.getRepository(Providers);
  const servicesRepository = AppDataSource.getRepository(Services);
  const usersRepository = AppDataSource.getRepository(Users);

  const provider = await providersRepository.findOneBy({
    id: providerId,
  });

  if (!provider) {
    throw new AppError("Provider not found", 404);
  }

  const user = await usersRepository.findOne({
    where: { id: userId },
    relations: { givedfeedbacks: true },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const service = await servicesRepository.findOne({
    where: {
      id: serviceId,
    },
    relations: {
      schedule: {
        provider: true,
        user: true,
      },
    },
  });

  if (!service) {
    throw new AppError("Service not found", 404);
  }

  if (!service.isServiceFinished) {
    throw new AppError('Service is not finished to feedback')
  }

  if(service.schedule.user.id !== userId){
    throw new AppError("User not related to the schedule")
  }

  const userGivenFeedbacks = user.givedfeedbacks;
  const providerFeedbacks = provider.feedbacks;

  providerFeedbacks.forEach((feedback) => {
    if (
      userGivenFeedbacks.some(
        (givenFeedback) => givenFeedback.id === feedback.id
      )
    ) {
      throw new AppError("User already given feedback to this service");
    }
  });

  const serviceFeedback = await servicesFeedbacksRepository.save({
    note,
    comment,
    service,
    provider,
    user,
  });

  const returnObj: any = {
    note,
    comment,
    service
  }

  delete returnObj.service.schedule.provider
  delete returnObj.service.schedule.user

  return returnObj;
};

export default createServiceFeedbackService;
