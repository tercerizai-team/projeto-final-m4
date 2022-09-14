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

  if (isAdm) {
    
  }

  let newService: any = {
    isServiceFinished: service.isServiceFinished,
    isServiceCanceled: service.isServiceCanceled,
    clientFinished: service.clientFinished,
    providerFinished: service.providerFinished,
  };

  if (isAdm) {
    newService.isServiceFinished = isServiceFinished
    newService.isServiceCanceled = isServiceCanceled

    newService.clientFinished = clientFinished
    newService.providerFinished = providerFinished
  }

  if (userId === service.schedule.user.id) {
    newService.clientFinished = clientFinished
  }

  if (userId === service.schedule.provider.id) {
    newService.providerFinished = providerFinished
  }

  if (newService.clientFinished && newService.providerFinished) {
    newService.isServiceFinished = true
  } else {
    newService.isServiceFinished = false
  }

  await serviceRepository.update({ id: serviceId }, newService);

  const updatedService = await serviceRepository.findOneBy({ id: serviceId });

  return updatedService;
};
