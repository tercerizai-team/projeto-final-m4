import { Request, Response } from "express";
import createServiceFeedbackService from "../../services/servicesFeedbacks/createServiceFeedback.services";

export const createServiceFeedbackController = async (req:Request, res: Response)  => {
    const feedbackRequest = req.body
    const userId = req.userId
    const feedback = await createServiceFeedbackService(feedbackRequest, userId)
    return res.status(201).json(feedback)
}