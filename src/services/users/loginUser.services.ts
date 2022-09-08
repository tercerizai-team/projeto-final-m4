import { IUserLogin } from "../../interfaces/users.interfaces";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { Providers } from "../../entities/providers.entity";

export const loginUserService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(Users);
  const providerRepository = AppDataSource.getRepository(Providers)
  let account:Users | Providers | null = await userRepository.findOne({ where: { email: email } });

  if (!account) {
    account = await providerRepository.findOne({ where: { email: email } });
  }

  if (!account) {
    throw new AppError("Invalid email or password", 403);
  }

  if (account.isActive === false) {
    throw new AppError("User are not active", 400);
  }

  const passwordMatch = await compare(password, account.password);

  if (!passwordMatch) {
    throw new AppError("Invalid email or password", 403);
  }

  const token = jwt.sign(
    {
      email: email,
      userId: account.id,
      userIsAdm: account instanceof Users ? account.isAdm : false,
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "2h",
    }
  );

  return token;
};
