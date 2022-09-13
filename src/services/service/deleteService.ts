import AppDataSource from "../../data-source";
import { Services } from "../../entities/services.entity";
import AppError from "../../errors/AppError";

export const deleteServiceService = async (
  serviceId: string,
  userId: string,
  isAdm: boolean
) => {
  const serviceRepository = AppDataSource.getRepository(Services);

  const service = await serviceRepository.findOne({
    where: {
      id: serviceId,
    },
    relations: {
      schedule: { user: true, provider: true },
    },
  });

  if (!service) {
    throw new AppError("Service not found", 404);
  }

  if (
    service.schedule.user.id !== userId ||
    service.schedule.provider.id !== userId
  ) {
    if (!isAdm) {
      throw new AppError("Not allowed", 401);
    }
  }

  return serviceRepository.delete(service.id);
};
