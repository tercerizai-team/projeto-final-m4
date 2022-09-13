import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/schedules.entity";
import { Services } from "../../entities/services.entity";
import { ServicesFeedbacks } from "../../entities/services_feedbacks.entity";
import AppError from "../../errors/AppError";

export const createServiceService = async (scheduleId: string) => {
  const serviceRepository = AppDataSource.getRepository(Services);
  const scheduleRepository = AppDataSource.getRepository(Schedules);

  const schedule = await scheduleRepository.findOneBy({ id: scheduleId });

  if (!schedule) {
    throw new AppError("Schedule not found", 404);
  }

  if (!schedule.finishServiceHour) {
    throw new AppError("Schedule not finished", 400);
  }

  const newService = new Services();
  newService.schedule = schedule;

  await serviceRepository.save(newService);

  return newService;
};
