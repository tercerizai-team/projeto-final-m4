import { Request, Response } from "express";
import updateUserFeedbackService from "../../services/usersFeedbacks/updateUserFeedback.service";

export const updateUserFeedbackController = async (
  req: Request,
  res: Response
) => {
  const { note, comment } = req.body;
  const feedbackId = req.params.id;
  const feedback = await updateUserFeedbackService({ note, comment }, feedbackId);
  return res.json(feedback);
};
