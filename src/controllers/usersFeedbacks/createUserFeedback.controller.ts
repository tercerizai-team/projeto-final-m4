import { Request, Response } from "express";
import createUserFeedbackService from "../../services/usersFeedbacks/createUserFeedback.service";

export const createUserFeedbackController = async (
  req: Request,
  res: Response
) => {
  const { note, comment, userId } = req.body;
  const providerId = req.userId;

  const newFeedback = await createUserFeedbackService(note, comment, userId, providerId);

  return res.status(201).json(newFeedback);
};
