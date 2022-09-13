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