import AppDataSource from "../../data-source";
import { DayHours } from "../../entities/dayHours.entity";
import { ProviderSchedule } from "../../entities/provider_schedule.entity";
import AppError from "../../errors/AppError";

const deleteProviderScheduleService = async (providerScheduleId: string) => {
  const providersSchedulesRepository =
    AppDataSource.getRepository(ProviderSchedule);
  const dayHoursRepository = AppDataSource.getRepository(DayHours);

  const providerScheduleExists = await providersSchedulesRepository.count({
    where: { id: providerScheduleId },
  });

  if (!providerScheduleExists) {
    throw new AppError("Provider schedule not found", 404);
  }

  const providerSchedule = await providersSchedulesRepository.findOneBy({
    id: providerScheduleId,
  });

  const dayHours = await dayHoursRepository.findOneBy({
    id: providerSchedule!.dayHours.id,
  });

  await providersSchedulesRepository.delete({ id: providerSchedule!.id });
  await dayHoursRepository.delete({ id: dayHours!.id });
};

export default deleteProviderScheduleService;
