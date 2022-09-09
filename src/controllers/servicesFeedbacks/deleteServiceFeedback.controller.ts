import { Request, Response } from "express";
import deleteServiceFeedbackService from "../../services/servicesFeedbacks/deleteServiceFeedback.services";

export const deleteServiceFeedbackController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  await deleteServiceFeedbackService(id);
  return res.json({ message: "Service feedback deleted" });
};
