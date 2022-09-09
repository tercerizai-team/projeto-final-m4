import AppDataSource from "../../data-source"
import { Schedules } from "../../entities/schedules.entity"
import AppError from "../../errors/AppError"
import { IScheduleUpdate } from "../../interfaces/schedule.interfaces"


const updateScheduleService = async ({hour, serviceDate, serviceDescription, value}: IScheduleUpdate, id: string, userId: string, isAdm: boolean) => {

    const scheduleRepository = AppDataSource.getRepository(Schedules)

    const findScheule = await scheduleRepository.findOne({
        where:{
            id: id
        },
        relations: {
            user: true,
            provider: true
        }
    })

    console.log('-------------------------------------------------------------', findScheule?.user.id !== userId)

    if (findScheule?.user.id !== userId && isAdm === false){
        throw new AppError("You are not allowed", 400)
    }

    const newScheule = {
        hour,
        serviceDate,
        serviceDescription,
        value,
    }

    await scheduleRepository.update({id}, newScheule)

    const updatedSchedule = await scheduleRepository.findOne({
        where:{
            id: id
        },
        relations: {
            user: true,
            provider: true
        }
    })

    return updatedSchedule

}

export default updateScheduleService