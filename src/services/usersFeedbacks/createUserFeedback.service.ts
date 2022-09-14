import AppDataSource from "../../data-source";
import { Providers } from "../../entities/providers.entity";
import { Users } from "../../entities/users.entity";
import { UsersFeedbacks } from "../../entities/users_feedbacks.entity";
import AppError from "../../errors/AppError";
import { IUserFeedbackRequest } from "../../interfaces/feedback.interfaces";

const createUserFeedbackService = async (
  { note, comment, userId }: IUserFeedbackRequest,
  providerId: string
): Promise<UsersFeedbacks> => {
  const usersFeedbacksRepository = AppDataSource.getRepository(UsersFeedbacks);
  const usersRepository = AppDataSource.getRepository(Users);
  const providersRepository = AppDataSource.getRepository(Providers);

  const user = await usersRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const provider = await providersRepository.findOne({
    where: { id: providerId },
    relations: { givedFeedbacks: true },
  });

  if (!provider) {
    throw new AppError("Provider not found", 404);
  }

  const providerGivenFeedbacks = provider.givedFeedbacks;
  const userFeedbacks = user.feedbacks;

  userFeedbacks.forEach((feedback) => {
    if (
      providerGivenFeedbacks.some(
        (givedFeedback) => givedFeedback.id === feedback.id
      )
    ) {
      throw new AppError("Provider already given feedback to this user");
    }
  });

  const feedback = await usersFeedbacksRepository.save({
    note,
    comment,
    user,
    provider,
  });

  return feedback;
};

export default createUserFeedbackService;
