import { Request, Response } from "express";
import listProviderFeedbacksService from "../../services/servicesFeedbacks/listProviderFeedbacks.services";

export const listProviderFeedbacksController = async (
  req: Request,
  res: Response
) => {
  const providerId = req.params.id;
  const feedbacks = await listProviderFeedbacksService(providerId);
  return res.json(feedbacks);
};
