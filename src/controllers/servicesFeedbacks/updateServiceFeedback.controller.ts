import { Request, Response } from "express";
import updateServiceFeedbackService from "../../services/servicesFeedbacks/updateServiceFeedback.services";

export const updateServiceFeedbackController = async (
  req: Request,
  res: Response
) => {
  const { note, comment } = req.body;
  const feedbackId = req.params.id;
  const feedback = await updateServiceFeedbackService(
    { note, comment },
    feedbackId
  );
  return res.json(feedback);
};
