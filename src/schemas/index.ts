/*import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  adress,
  IProviderRequest,
  IProviderRequestYup,
} from "../interfaces/providers.interface";

const providerSchema: SchemaOf<IProviderRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  phone: yup.string().required(),
  address: yup.object({
    state: yup.string().required(),
    city: yup.string().required(),
    zipCode: yup.string().required().length(8),
    number: yup.string().required(),
    street: yup.string().required(),
    district: yup.string().required(),
    complement: yup.string(),
  }),
});

export { providerSchema };*/
