import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import { Addresses } from "../entities/addresses.entity";
import AppDataSource from "../data-source";
import { IAdressRequest } from "../interfaces/address.interfaces";
import { Providers } from "../entities/providers.entity";

export const providerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const addressRepository = AppDataSource.getRepository(Addresses);
  const providerRepository = AppDataSource.getRepository(Providers)

  const address = req.body.address;
  const {email} = req.body

  const verifyEmail = await providerRepository.findOneBy({email: email})
  
  if (verifyEmail){
    throw new AppError("User already exists", 400)
  }

  const { state, street, district, number, complement, city, zipCode }: IAdressRequest =
    address;

  if (zipCode.length > 8) {
    throw new AppError("Invalid zipCode");
  }
  const addressAlreadyExists = await addressRepository.findOne({
    where: {
      street: street,
      number: number,
      complement: complement
    },
  });


  if (addressAlreadyExists) {
    throw new AppError("Address already exists", 400);
  }

  const newAddress = new Addresses();
  newAddress.zipCode = zipCode;
  newAddress.city = city;
  newAddress.complement = complement!;
  newAddress.number = number;
  newAddress.district = district;
  newAddress.street = street;
  newAddress.state = state;

  addressRepository.create(newAddress);
  await addressRepository.save(newAddress);

  next();
};
