import AppDataSource from "../../data-source";
import { Services } from "../../entities/services.entity";
import AppError from "../../errors/AppError";
import { IServiceUpdateRequest } from "../../interfaces/services.interfaces";

export const updateServiceService = async (
  {
    isServiceFinished,
    isServiceCanceled,
    clientFinished,
    providerFinished,
  }: IServiceUpdateRequest,
  serviceId: string,
  userId: string,
  isAdm: boolean
) => {
  const serviceRepository = AppDataSource.getRepository(Services);

  //   const service = await serviceRepository.findOneBy({ id: serviceId });

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

  const newService = {
    isServiceFinished: isServiceFinished,
    isServiceCanceled: isServiceCanceled,
    clientFinished: clientFinished,
    providerFinished: providerFinished,
  };

  await serviceRepository.update({ id: serviceId }, newService);

  const updatedService = await serviceRepository.findOneBy({ id: serviceId });

  return updatedService;
};
