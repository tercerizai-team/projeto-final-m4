import { Request, Response } from "express";
import listUserFeedbacksService from "../../services/usersFeedbacks/listUserFeedbacks.service";

export const listUserFeedbacksController = async (
  req: Request,
  res: Response
) => {
  const userId = req.params.id;
  const feedbacks = await listUserFeedbacksService(userId);

  return res.json(feedbacks);
};
