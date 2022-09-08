import { Addresses } from "../../entities/addresses.entity";
import { IAdressRequest } from "../../interfaces/address.interfaces";
import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";

const createAddressesService = async ({
  state,
  city,
  zipCode,
  number,
  street,
  district,
  complement,
}: IAdressRequest) => {
  const addressesRepository = AppDataSource.getRepository(Addresses);
  const address = await addressesRepository.find();
  const streetAlreadyExists = address.find(
    (address) => address.street === street
  );

  const numberAlreadyExists = address.find(
    (address) => address.number === number
  );

  if (streetAlreadyExists && numberAlreadyExists) {
    throw new AppError("address already exists", 400);
  }

  const newAddress = new Addresses();
  newAddress.state = state;
  newAddress.city = city;
  newAddress.zipCode = zipCode;
  newAddress.number = number;
  newAddress.street = street;
  newAddress.district = district;
  newAddress.complement = complement!;

  addressesRepository.create(newAddress);
  await addressesRepository.save(newAddress);

  return newAddress;
};

export default createAddressesService;
