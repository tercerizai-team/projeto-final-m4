import { Addresses } from "../../entities/addresses.entity";
import { IAdressRequest } from "../../interfaces/address.interfaces";
import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import { v4 as uuid } from "uuid";
import { AddressesUsers } from "../../entities/addresses_users.entity";
import { Users } from "../../entities/users.entity";
import { addMethod } from "yup";

const createAddressesService = async (
  {
    state,
    city,
    zipCode,
    number,
    street,
    district,
    complement,
  }: IAdressRequest,
  userId: string
) => {

  if(!zipCode || zipCode.length !== 8){
    throw new AppError("zipCode precisa possuir 8 dígitos");
  }

  const addressesRepository = AppDataSource.getRepository(Addresses);
  const address = await addressesRepository.find();

  const newAddress = new Addresses();
  newAddress.id = uuid();
  newAddress.state = state;
  newAddress.city = city;
  newAddress.zipCode = zipCode;
  newAddress.number = number;
  newAddress.street = street;
  newAddress.district = district;
  newAddress.complement = complement!;

  addressesRepository.create(newAddress);
  await addressesRepository.save(newAddress);

  if (userId) {
    const addressUserRepository = AppDataSource.getRepository(AddressesUsers);
    const userRepository = AppDataSource.getRepository(Users);

    const users = await userRepository.find();

    const user = users.find((user) => user.id === userId);


    const newPivotAddress: any = {
      id: uuid(),
      address: newAddress,
      user: user,
    };

    const addressAlreadyExists = address.find(address => address.street === street && address.number === number && address.zipCode === zipCode)

    if (addressAlreadyExists) {
      throw new AppError("address already exists", 400);
    }
    addressUserRepository.create(newPivotAddress);
    await addressUserRepository.save(newPivotAddress);
  }

  return newAddress;
};

export default createAddressesService;
