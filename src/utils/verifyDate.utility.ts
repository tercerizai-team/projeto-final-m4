import AppError from "../errors/AppError"


export const verifyHours = (initDateNow: Date, dbInitHour: string, limitDateNow: Date, dbLimitHour: string) => {

    const newInitHour = initDateNow.getHours()

    const initDate = new Date()
    const initHour = dbInitHour.split(":")
    initDate.setHours(parseInt(initHour[0]))
    const dbHourInit = initDate.getHours()

    const newLimitHour = limitDateNow.getHours()

    const limitDate = new Date()
    const limitHour = dbLimitHour.split(":")
    limitDate.setHours(parseInt(limitHour[0]))
    const dbHourLimit = limitDate.getHours()

    if(newInitHour === dbHourInit && newLimitHour === dbHourLimit){
        throw new AppError("este dia já tem horários similares na agenda, favor atualizar");
    }

    if(newInitHour === dbHourInit && newLimitHour < dbHourLimit){
        throw new AppError("este dia já tem horários similares na agenda, favor atualizar");
    }

    if(newInitHour < dbHourInit && newLimitHour > dbHourLimit){
        throw new AppError("este dia já tem horários similares na agenda, favor atualizar");
    }

    if(newInitHour < dbHourInit && newLimitHour < dbHourLimit && newLimitHour > dbHourInit){
        throw new AppError("este dia já tem horários similares na agenda, favor atualizar");
    }

    if(newInitHour === dbHourInit){
        throw new AppError("este dia já tem horários similares na agenda, favor atualizar");
    }

    if(newInitHour > dbHourLimit && newLimitHour > newInitHour){
        return true
    }

    if(newInitHour < dbHourInit && newLimitHour < dbHourLimit && newLimitHour < dbHourInit){
        return true
    }

}

export const validateUpdateDayHours = (providerSchedulesByDay: any, initDate: Date, limitDate: Date, dayHourId: string) => {

    let validate = true

    const initHourUpdate = initDate.getHours()
    const limitHourUpdate = limitDate.getHours()

    providerSchedulesByDay.forEach((provSched:any) => {

        const splitedDbInitHour = provSched.dayHours.initHour.toString().split(":")
        const dbInitHour = splitedDbInitHour[0]

        const splitedDbLimitHour = provSched.dayHours.limitHour.toString().split(":")
        const dbLimitHour = splitedDbLimitHour[0]

        if(initHourUpdate > dbLimitHour && dayHourId === provSched.dayHours.id){
            throw new AppError("não é possível atualizar uma hora inicial para maior que uma final no mesmo dia");
        }

        if(limitHourUpdate < dbInitHour && dayHourId === provSched.dayHours.id){
            throw new AppError("não é possível atualizar uma hora inicial para maior que uma final no mesmo dia");
        }
        
        if(initHourUpdate <= dbLimitHour && dayHourId !== provSched.dayHours.id){
            throw new AppError("não é possível atualizar uma hora inicial para maior que uma final já existente");
        }

        if(limitHourUpdate <= dbInitHour && dayHourId !== provSched.dayHours.id){
            throw new AppError("não é possível atualizar uma hora final para maior que uma inicial já existente");
        }
    })

    return validate

}