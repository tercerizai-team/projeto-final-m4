import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/schedules.entity";
import AppError from "../../errors/AppError";
import { IScheduleUpdate } from "../../interfaces/schedule.interfaces";

const updateScheduleService = async (
  {
    hour,
    serviceDate,
    serviceDescription,
    value,
    finishServiceHour,
    clientConfirmed,
    providerConfirmed
  }: IScheduleUpdate,
  id: string,
  userId: string,
  isAdm: boolean
) => {

  const scheduleRepository = AppDataSource.getRepository(Schedules);

  const findSchedule = await scheduleRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      user: true,
      provider: true,
    },
  });

  if(!findSchedule){
    throw new AppError("agendamento não encontrado", 404);
    
  }

  if(isAdm){

    const newScheule = {
      hour,
      serviceDate,
      serviceDescription,
      value,
      finishServiceHour,
      clientConfirmed,
      providerConfirmed

    };

    await scheduleRepository.update({ id }, newScheule);

    const updatedSchedule = await scheduleRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
        provider: true,
      },
    });
  
    return updatedSchedule;

  }

  let newSchedule:IScheduleUpdate = {
    hour,
    serviceDate,
    serviceDescription,
    value,
    finishServiceHour,
    clientConfirmed,
    providerConfirmed
  };

  if(userId === findSchedule?.user.id){
    newSchedule.clientConfirmed = clientConfirmed
  }

  if(userId === findSchedule?.provider.id){
    newSchedule.providerConfirmed = providerConfirmed
  }

  console.log(newSchedule)

  await scheduleRepository.update({ id }, newSchedule);

  const updatedSchedule = await scheduleRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      user: true,
      provider: true,
    },
  });

  return updatedSchedule;
};

export default updateScheduleService;
