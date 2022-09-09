import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import AppError from "../../errors/AppError";
import { Users } from "../../entities/users.entity";
import { AddressesUsers } from "../../entities/addresses_users.entity";

const getAddressesService = async (addressId: string, userId: string) => {

  const addressRepository = AppDataSource.getRepository(Addresses);

  const addressUserRepository = AppDataSource.getRepository(AddressesUsers);

  const pivotAddress = await addressUserRepository.find();

  //const address = await addressRepository.findOneBy({id: addressId});

//   if (!address) {
//     throw new AppError("Address not found", 404);
//   }



  const addressToGet = pivotAddress.find((elem) => elem.address.id === addressId);

  console.log("------------------", pivotAddress,addressToGet)

  if(addressToGet?.user.id !== userId){
    throw new AppError("You don't have permission", 404);
  }    



  //return addressToGet;
};

export default getAddressesService;
