import AppDataSource from "../../data-source";
import { DayHours } from "../../entities/dayHours.entity";
import { Providers } from "../../entities/providers.entity";
import { ProviderSchedule } from "../../entities/provider_schedule.entity";
import AppError from "../../errors/AppError";
import { IProviderScheduleRequest } from "../../interfaces/providerSchedules.interfaces";
import { v4 as uuid, validate } from "uuid"
import { verifyHours } from "../../utils/verifyDate.utility";


export const createNewProviderScheduleService = async ({ day, initHour, limitHour }: IProviderScheduleRequest, userId: string) => {

    if(!day || !initHour || !limitHour){
        throw new AppError("missing register info");
    }

    const hoursRepository = AppDataSource.getRepository(DayHours)
    const providerSchedulesRepository = AppDataSource.getRepository(ProviderSchedule)
    const providersRepository = AppDataSource.getRepository(Providers)

    const providers = await providersRepository.find()
    const allProviderSchedules = await providerSchedulesRepository.find({ relations: {provider: true} })

    const validateUserId = providers.find(provider => provider.id === userId)

    if(!validateUserId){
        throw new AppError("provider not found", 404);
    }

    const validateDaysHours = allProviderSchedules.filter((provSchedules) => {
        return provSchedules.dayHours.day === day && provSchedules.provider.id === userId
    })

    const splitedInitHour = initHour.split(":")

    const initDateNow = new Date()
    initDateNow.setHours(parseInt(splitedInitHour[0]))
    initDateNow.setMinutes(parseInt(splitedInitHour[1]))

    const splitedLimitHour = limitHour.split(":")

    const limitDateNow = new Date()
    limitDateNow.setHours(parseInt(splitedLimitHour[0]))
    limitDateNow.setMinutes(parseInt(splitedLimitHour[1]))

    let hourIsValid = false
    let dayIsValid = true

    validateDaysHours.forEach(scheduleDay => {

        const validateHours = verifyHours(initDateNow, scheduleDay.dayHours.initHour.toString(), limitDateNow, scheduleDay.dayHours.limitHour.toString())

        if(scheduleDay.dayHours.day === day){
            dayIsValid = false
        }

        if(validateHours){
            hourIsValid = true
        }

    })

    if(!hourIsValid && !dayIsValid){
        throw new AppError("horário inválido, verifique sua requisição");
    }

    const newDayHour = {
        id: uuid(),
        day,
        initHour: initDateNow,
        limitHour: limitDateNow
    }

    await hoursRepository.save(newDayHour)

    const newProviderSchedule = {
        id: uuid(),
        dayHours: newDayHour,
        provider: validateUserId
    }

    await providerSchedulesRepository.save(newProviderSchedule)

    return newProviderSchedule

}