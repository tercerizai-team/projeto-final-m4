import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import { AddressesUsers } from "../../entities/addresses_users.entity";
import { Users } from "../../entities/users.entity";

const getAddressesService = async (userId: string, userIsAdm: boolean) => {
  const addressUserRepository = AppDataSource.getRepository(AddressesUsers);

  const pivotAddress = await addressUserRepository.find();


  const addressToGet = pivotAddress.find(
    elem => elem.address.id === addressId
  );

  if (userIsAdm === true) {
    const usersRepository = AppDataSource.getRepository(Users);

    const users = await usersRepository.find({
      relations: { addresses: true },
    });

    if (!users) {
      throw new AppError("User not found", 404);
    }

    return users
  }

  return addressToGet;
};

export default getAddressesService;
