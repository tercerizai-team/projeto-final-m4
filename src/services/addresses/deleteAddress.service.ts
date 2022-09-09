import { Addresses } from "../../entities/addresses.entity";
import { IAdressRequest } from "../../interfaces/address.interfaces";
import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";

export const deleteAddressService = async (id: string) => {
  const addressRepository = AppDataSource.getRepository(Addresses);
  const address = await addressRepository.findOneBy({ id });

  if (!address) {
    throw new AppError("Address not found");
  }

  addressRepository.delete(id);
};
