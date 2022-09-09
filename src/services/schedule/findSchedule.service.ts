import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/schedules.entity";
import AppError from "../../errors/AppError";

export const findScheduleService = async (id: string) => {
  const scheduleRepository = AppDataSource.getRepository(Schedules);
  const schedule = await scheduleRepository.findOneBy({ id: id });

  if (!schedule) {
    throw new AppError("Schedule not found", 404);
  }

  return schedule;
};
