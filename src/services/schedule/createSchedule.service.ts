import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Providers } from "../../entities/providers.entity";
import { Schedules } from "../../entities/schedules.entity";
import { Users } from "../../entities/users.entity";
import AppError from "../../errors/AppError";
import { IScheduleRequest } from "../../interfaces/schedule.interfaces";

export const createScheduleService = async (
  {
    hour,
    serviceDate,
    description,
    value,
    providerId,
    addressId,
    finishServiceHour
  }: IScheduleRequest,
  data: any
) => {
  const scheduleRepository = AppDataSource.getRepository(Schedules);
  const userRepository = AppDataSource.getRepository(Users);
  const providerRepository = AppDataSource.getRepository(Providers);
  const addressRepository = AppDataSource.getRepository(Addresses);

  const idUser = data.userId;

  const user = await userRepository.findOneBy({ id: idUser });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const provider = await providerRepository.findOneBy({ id: providerId });

  if (!provider) {
    throw new AppError("Provider not found", 404);
  }

  const address = await addressRepository.findOneBy({ id: addressId });

  if (!address) {
    throw new AppError("Provider not found", 404);
  }

  const scheduleList = await scheduleRepository.find();

  const scheduleAlreadyExists = scheduleList.find(
    (schedule) => schedule.hour == hour && schedule.serviceDate == serviceDate
  );

  if (scheduleAlreadyExists) {
    throw new AppError("Schedule unavaliable", 400);
  }

  const newSchedule = new Schedules();
  newSchedule.hour = hour;
  newSchedule.finishServiceHour = finishServiceHour;
  newSchedule.serviceDate = serviceDate;
  newSchedule.serviceDescription = description;
  newSchedule.value = value;
  newSchedule.provider = provider;
  newSchedule.address = address;
  newSchedule.user = user;

  scheduleRepository.create(newSchedule);
  await scheduleRepository.save(newSchedule);

  return newSchedule;
};
