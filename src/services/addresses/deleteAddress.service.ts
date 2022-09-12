import { Addresses } from "../../entities/addresses.entity";
import { IAdressRequest } from "../../interfaces/address.interfaces";
import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import { AddressesUsers } from "../../entities/addresses_users.entity";

export const deleteAddressService = async (id: string, userId: string) => {
  const addressRepository = AppDataSource.getRepository(Addresses);
  const addressUserRepository = AppDataSource.getRepository(AddressesUsers)
  const address = await addressRepository.findOneBy({ id });

  if (!address) {
    throw new AppError("Address not found");
  }
  const pivotAddress = await addressUserRepository.find();

  const addressToDelete: any = pivotAddress.find(
    elem => elem.address.id === id && elem.user.id === userId
  );

  
  
  await addressUserRepository.delete(addressToDelete?.id)
  await addressRepository.delete(id);

  return true
};
