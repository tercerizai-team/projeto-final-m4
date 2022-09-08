import { Request, Response } from "express";
import listUserFeedbacksService from "../../services/usersFeedbacks/listUserFeedbacks.service";

export const listUserFeedbacksController = async (
  req: Request,
  res: Response
) => {
  const userId = req.userId;
  const feedbacks = listUserFeedbacksService(userId);

  return res.json(feedbacks);
};
