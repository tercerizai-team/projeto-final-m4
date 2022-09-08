import { IUserLogin } from "../../interfaces/users.interfaces";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../../errors/AppError";

export const loginUserService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(Users);
  const account = await userRepository.findOne({ where: { email: email } });

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
      userIsAdm: account.isAdm,
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "2h",
    }
  );

  return token;
};
