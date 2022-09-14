import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import updateScheduleService from "../../services/schedule/updateSchedule.services";

const updateScheduleController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { hour, serviceDate, serviceDescription, value, finishServiceHour, clientConfirmed, providerConfirmed } =
    req.body;
  const userId = req.userId;
  const isAdm = req.userIsAdm;

  const updatedSchedule = await updateScheduleService(
    { hour, serviceDate, serviceDescription, value, finishServiceHour, clientConfirmed, providerConfirmed },
    id,
    userId,
    isAdm
  );

  return res.status(200).send(instanceToPlain(updatedSchedule));
};

export default updateScheduleController;
