import AppDataSource from "../../data-source";
import { UsersFeedbacks } from "../../entities/users_feedbacks.entity";
import { IFeedbackRequest } from "../../interfaces/feedback.interfaces";

const updateUserFeedbackService = async (
  { note, comment }: IFeedbackRequest,
  feedbackId: string
) => {
  const usersFeedbacksRepository = AppDataSource.getRepository(UsersFeedbacks);

  const feedback = await usersFeedbacksRepository.update(feedbackId, {
    note,
    comment,
  });
  return feedback;
};

export default updateUserFeedbackService;
