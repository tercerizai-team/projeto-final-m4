import { Request, Response } from "express";
import deleteUserFeedbackService from "../../services/usersFeedbacks/deleteUserFeedback.service";

export const deleteUserFeedbackController = async (
  req: Request,
  res: Response
) => {
  const feedbackId = req.params.id;
  await deleteUserFeedbackService(feedbackId);
  return res.json({ message: "Feedback deleted" });
};
