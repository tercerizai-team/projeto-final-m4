import AppDataSource from "../../data-source";
import { UsersFeedbacks } from "../../entities/users_feedbacks.entity";
import { IFeedbackRequest } from "../../interfaces/feedback.interfaces";

const updateUserFeedbackService = async (
  { note, comment }: IFeedbackRequest,
  feedbackId: string
) => {
  const usersFeedbacksRepository = AppDataSource.getRepository(UsersFeedbacks);

  await usersFeedbacksRepository.update(feedbackId, {
    note,
    comment,
  });

  const feedback = usersFeedbacksRepository.findOneBy({id: feedbackId})

  return feedback;
};

export default updateUserFeedbackService;
