import AppDataSource from "../../data-source";
import { UsersFeedbacks } from "../../entities/users_feedbacks.entity";

const deleteUserFeedbackService = async (id: string) => {
  const usersFeedbacksRepository = AppDataSource.getRepository(UsersFeedbacks);

  await usersFeedbacksRepository.delete({ id });
};

export default deleteUserFeedbackService;
