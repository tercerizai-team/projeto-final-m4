import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import AppError from "../../errors/AppError";

const listUserFeedbacksService = async (userId: string) => {
  const usersRepository = AppDataSource.getRepository(Users);

  const user = await usersRepository.findOne({
    where: { id: userId },
    relations: { feedbacks: true },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user.feedbacks;
};

export default listUserFeedbacksService;
