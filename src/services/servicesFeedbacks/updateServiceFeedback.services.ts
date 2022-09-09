import AppDataSource from "../../data-source";
import { ServicesFeedbacks } from "../../entities/services_feedbacks.entity";
import AppError from "../../errors/AppError";
import { IFeedbackRequest } from "../../interfaces/feedback.interfaces";

const updateServiceFeedbackService = async (
  { note, comment }: IFeedbackRequest,
  feedbackId: string
) => {
  const servicesFeedbacksRepository =
    AppDataSource.getRepository(ServicesFeedbacks);

  const feedbackExists = await servicesFeedbacksRepository.count({
    where: { id: feedbackId },
  });

  if (!feedbackExists) {
    throw new AppError("Feedback not found");
  }

  await servicesFeedbacksRepository.update(feedbackId, {
    note,
    comment,
  });

  const feedback = await servicesFeedbacksRepository.findOneBy({
    id: feedbackId,
  });

  return feedback;
};

export default updateServiceFeedbackService;
