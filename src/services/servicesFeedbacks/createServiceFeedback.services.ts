import AppDataSource from "../../data-source";
import { Providers } from "../../entities/providers.entity";
import { Services } from "../../entities/services.entity";
import { ServicesFeedbacks } from "../../entities/services_feedbacks.entity";
import { Users } from "../../entities/users.entity";
import AppError from "../../errors/AppError";
import { IServiceFeedbackRequest } from "../../interfaces/feedback.interfaces";

const createServiceFeedbackService = async (
  {note, comment, serviceId, providerId}: IServiceFeedbackRequest,
  userId: string
) => {
  const servicesFeedbacksRepository =
    AppDataSource.getRepository(ServicesFeedbacks);
  const providersRepository = AppDataSource.getRepository(Providers);
  const servicesRepository = AppDataSource.getRepository(Services);
  const usersRepository = AppDataSource.getRepository(Users);

  const service = await servicesRepository.findOneBy({
    id: serviceId,
  });

  if (!service) {
    throw new AppError("Service not found", 404);
  }

  const provider = await providersRepository.findOneBy({
    id: providerId,
  });

  if (!provider) {
    throw new AppError("Provider not found", 404);
  }

  const user = await usersRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const serviceFeedback = await servicesFeedbacksRepository.save({
    note,
    comment,
    service,
    provider,
    user,
  });

  return serviceFeedback;
};

export default createServiceFeedbackService;
