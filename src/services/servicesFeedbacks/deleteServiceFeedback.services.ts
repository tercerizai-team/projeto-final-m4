import AppDataSource from "../../data-source";
import { ServicesFeedbacks } from "../../entities/services_feedbacks.entity";
import AppError from "../../errors/AppError";

const deleteServiceFeedbackService = async (id: string) => {
  const servicesFeedbacksRepository =
    AppDataSource.getRepository(ServicesFeedbacks);

  const feedbackExists = await servicesFeedbacksRepository.count({
    where: { id },
  });

  if (!feedbackExists) {
    throw new AppError("Feedback not found", 404);
  }

  await servicesFeedbacksRepository.delete({ id });
};

export default deleteServiceFeedbackService;
