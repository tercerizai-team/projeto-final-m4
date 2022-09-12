import AppDataSource from "../../data-source";
import { DayHours } from "../../entities/dayHours.entity";
import { ProviderSchedule } from "../../entities/provider_schedule.entity";
import AppError from "../../errors/AppError";
import { IProviderScheduleRequest } from "../../interfaces/providerSchedules.interfaces";

const updateProviderScheduleService = async (
  { day, initHour, limitHour }: IProviderScheduleRequest,
  id: string
) => {
  const providersSchedulesRepository =
    AppDataSource.getRepository(ProviderSchedule);
  const dayHoursRepository = AppDataSource.getRepository(DayHours);

  const providerSchedule = await providersSchedulesRepository.findOne({
    where: { id },
  });

  if (!providerSchedule) {
    throw new AppError("Provider schedule not found", 404);
  }

  const dayHours = await dayHoursRepository.findOneBy({
    id: providerSchedule!.dayHours.id,
  });

  await dayHoursRepository.update(dayHours!.id, {
    day,
    initHour,
    limitHour,
  });
};

export default updateProviderScheduleService;
