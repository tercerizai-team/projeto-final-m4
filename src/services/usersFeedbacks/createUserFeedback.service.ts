import AppDataSource from "../../data-source";
import { Providers } from "../../entities/providers.entity";
import { Users } from "../../entities/users.entity";
import { UsersFeedbacks } from "../../entities/users_feedbacks.entity";
import AppError from "../../errors/AppError";

const createUserFeedbackService = async (
  note: number,
  comment: string,
  userId: string,
  providerId: string
): Promise<UsersFeedbacks> => {
  const usersFeedbacksRepository = AppDataSource.getRepository(UsersFeedbacks);
  const usersRepository = AppDataSource.getRepository(Users);
  const providersRepository = AppDataSource.getRepository(Providers);

  const user = await usersRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const provider = await providersRepository.findOneBy({ id: providerId });

  const feedback = usersFeedbacksRepository.save({
    note,
    comment,
    user,
    provider,
  });

  return feedback;
};

export default createUserFeedbackService;
