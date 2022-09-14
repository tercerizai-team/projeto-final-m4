import AppDataSource from "../../data-source";
import { Providers } from "../../entities/providers.entity";
import AppError from "../../errors/AppError";

const listProviderFeedbacksService = async (providerId: string) => {
  const providersRepository = AppDataSource.getRepository(Providers);

  const provider = await providersRepository.findOne({
    where: { id: providerId },
    relations: { feedbacks: true },
  });

  if (!provider) {
    throw new AppError("Provider not found");
  }

  return provider.feedbacks;
};

export default listProviderFeedbacksService;
