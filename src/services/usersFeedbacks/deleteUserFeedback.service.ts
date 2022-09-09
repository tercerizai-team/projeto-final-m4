import AppDataSource from "../../data-source";
import { UsersFeedbacks } from "../../entities/users_feedbacks.entity";
import AppError from "../../errors/AppError";

const deleteUserFeedbackService = async (id: string) => {
  const usersFeedbacksRepository = AppDataSource.getRepository(UsersFeedbacks);

  const feedbackExists = await usersFeedbacksRepository.count({where: {id}})

  if(!feedbackExists) {
    throw new AppError("Feedback does not exist", 404)
  }

  await usersFeedbacksRepository.delete({ id });
};

export default deleteUserFeedbackService;
