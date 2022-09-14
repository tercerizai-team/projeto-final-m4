import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import { Schedules } from "../../entities/schedules.entity";
import { Services } from "../../entities/services.entity";

const getServicesService = async (userId: string, userIsAdm: boolean) => {
  const schedulesRepository = AppDataSource.getRepository(Schedules);
  const servicesRepository = AppDataSource.getRepository(Services);

  const schedules = await schedulesRepository.find({
    relations: { provider: true, user: true },
  });
  const services = await servicesRepository.find({
    relations: { schedule: { user: true, provider: true } },
  });

  if (userIsAdm === true) {
    return services;
  }

  const userScheduleToGet = services.find((elem) => elem.schedule.user.id === userId);
  const providerScheduleToGet = services.find(
    (elem) =>  elem.schedule.provider.id === userId
  );

  if (userScheduleToGet) {
    return userScheduleToGet;
  }
  if (providerScheduleToGet) {
    return providerScheduleToGet;
  }

  if (!userScheduleToGet) {
    throw new AppError("User not found", 404);
  }

  if (!providerScheduleToGet) {
    throw new AppError("Provider not found", 404);
  }
};

export default getServicesService;
