import AppDataSource from "../../data-source";
import { DayHours } from "../../entities/dayHours.entity";
import { ProviderSchedule } from "../../entities/provider_schedule.entity";
import AppError from "../../errors/AppError";
import { IProviderScheduleRequest } from "../../interfaces/providerSchedules.interfaces";
import { validateUpdateDayHours } from "../../utils/verifyDate.utility";

const updateProviderScheduleService = async (
  {day, initHour, limitHour }: IProviderScheduleRequest,
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

  if(!day){
    day = providerSchedule.dayHours.day
  }

  const dayHours:any = await dayHoursRepository.findOneBy({
    id: providerSchedule!.dayHours.id,
  });

  const allProvidersSchedules = await providersSchedulesRepository.find()

  const providerSchedulesByDay = allProvidersSchedules.filter(providerSched => providerSched.dayHours.day === providerSchedule.dayHours.day)

  
  const initDate = new Date()
  if(!initHour){
    const dbInitHour = providerSchedule.dayHours.initHour.toString().split(":")
    initDate.setHours(parseInt(dbInitHour[0]))
    initDate.setMinutes(parseInt(dbInitHour[1]))
  }
  else{
    const splitedInitHour = initHour?.split(":")
    initDate.setHours(parseInt(splitedInitHour[0]))
    initDate.setMinutes(parseInt(splitedInitHour[1]))
  }


  const limitDate = new Date()
  if(!limitHour){
    const dbLimitHour = providerSchedule.dayHours.limitHour.toString().split(":")
    limitDate.setHours(parseInt(dbLimitHour[0]))
    limitDate.setMinutes(parseInt(dbLimitHour[1]))
  }
  else{
    const splitedLimitHour = limitHour?.split(":")
    limitDate.setHours(parseInt(splitedLimitHour[0]))
    limitDate.setMinutes(parseInt(splitedLimitHour[1]))
  }


  if(providerSchedulesByDay.length < 2){

    await dayHoursRepository.update(dayHours!.id, {
    day,
    initHour: initDate,
    limitHour: limitDate
    });

  }else{

    const updateIsValid = validateUpdateDayHours(providerSchedulesByDay, initDate, limitDate, dayHours.id)

    if(updateIsValid){
      await dayHoursRepository.update(dayHours!.id, {
        day,
        initHour: initDate,
        limitHour: limitDate
        });
    }

  }

};

export default updateProviderScheduleService;
