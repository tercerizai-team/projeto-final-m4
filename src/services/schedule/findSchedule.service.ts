import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/schedules.entity";
import AppError from "../../errors/AppError";
import scheduleRoutes from "../../routes/schedule.routes";

export const findScheduleService = async (id: string) => {
  const scheduleRepository = AppDataSource.getRepository(Schedules);
  const schedules = await scheduleRepository.find({relations: { user:true, provider:true }});

  const schedule = schedules.find(sched => sched.id === id)

  if (!schedule) {
    throw new AppError("Schedule not found", 404);
  }

  return schedule;
};
