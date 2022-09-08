import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import { Addresses } from "../entities/addresses.entity";
import AppDataSource from "../data-source";

export const providerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const addressRepository = AppDataSource.getRepository(Addresses);

  const address = req.body.address;

  const { state, street, district, number, complement, city, zipCode } =
    address;

  const addressAlreadyExists = await addressRepository.findOne({
    where: { cep: zipCode },
  });

  if (addressAlreadyExists) {
    next();
  }

  const newAddress = new Addresses();
  newAddress.cep = zipCode;
  newAddress.city = city;
  newAddress.complement = complement;
  newAddress.number = number;
  newAddress.district = district;
  newAddress.street = street;
  newAddress.state = state;

  addressRepository.create(newAddress);
  await addressRepository.save(newAddress);

  next();
};