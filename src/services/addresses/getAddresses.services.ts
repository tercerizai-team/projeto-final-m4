import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import { AddressesUsers } from "../../entities/addresses_users.entity";


const getAddressesService = async (addressId: string, userId: string, userIsAdm: boolean) => {

  const addressUserRepository = AppDataSource.getRepository(AddressesUsers);

  const pivotAddress = await addressUserRepository.find();

  const addressToGet = pivotAddress.find(
    elem => elem.address.id === addressId
  );

    if(addressToGet?.user.id !== userId && userIsAdm === false ){
      throw new AppError("You don't have permission", 404);
    }

  return addressToGet;
};

export default getAddressesService;
