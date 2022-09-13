//aqui ficam os Mocks para testes

//users

export const mockedUserNotAdm = {
  name: "Jorgin",
  email: "jorgin@mail.com",
  password: "1234",
  phone: "4111111111",
  isAdm: false,
};

export const mockedUser = {
  name: "Jorjão",
  email: "jorjão@mail.com",
  password: "1234",
  phone: "4111111111",
  isAdm: false,
};

export const mockedUserAdm = {
  name: "Jorge",
  email: "jorge@mail.com",
  password: "1234",
  phone: "4111111111",
  isAdm: true,
};

export const mockedUserUpdate = {
  name: "Mateus",
};

export const mockedProvider = {
  email: "exemplo@gmail.com",
  name: "Matheus Willcox",
  phone: "32098765456",
  password: "432423!@aa",
  isPremium: false,
  address: {
    state: "PE",
    street: "Rua tal",
    district: "Bairro tal",
    number: "32",
    complement: "Portão azul",
    city: "Recife",
    zipCode: "12345678",
  },
};


export const mockedProviderLogin = {
  name: "Matheus Willcox",
  password: "432423!@aa"
}

export const mockedUserLogin = {
  email: "jorgin@mail.com",
  password: "123"
}



export const mockedProviderTest = {
  email: "teste@gmail.com",
  name: "Matheus Willcox",
  phone: "32098765456",
  password: "432423!@aa",
  isPremium: false,
  address: {
    state: "PR",
    street: "Rua Fabio jr",
    district: "Bairro tal",
    number: "10",
    complement: "Portão azul",
    city: "Recife",
    zipCode: "12345679",
  },
};

export const mockedProviderPremium = {
  email: "exemplo2@gmail.com",
  name: "Matheus Willcox",
  phone: "32098765456",
  password: "432423!@aa",
  isPremium: true,
  address: {
    state: "PE",
    street: "Rua tal",
    district: "Bairro tal",
    number: "32",
    complement: "Portão azul",
    city: "Recife",
    zipCode: "12345678",
  },
};

export const mockedProviderWithoutAddress = {
  email: "exemplo@gmail.com",
  name: "Matheus Willcox",
  phone: "32098765456",
  password: "432423!@aa",
  isPremium: false,
};

export const mockedProviderUpdate = {
  name: "jorgin"
}


export const mockedAddress = {
  state: "PE",
  street: "Rua tal",
  district: "Bairro tal",
  number: "32",
  complement: "Portão azul",
  city: "Recife",
  zipCode: "12345678"
}

export const twoMockedAddress = {
  state: "PE",
  street: "Rua tal",
  district: "Bairro tal",
  number: "31",
  complement: "Portão azul",
  city: "Recife",
  zipCode: "12345679"
}

export const mockedAddressNoZip = {
  state: "PE",
  street: "Rua tal",
  district: "Bairro tal",
  number: "32",
  complement: "Portão azul",
  city: "Recife",
  zipCode: ""
}

export const mockedAddressUpdate = {
  state: "PR",
}

export const mockedCategory = {
  name: "Casa"
}

export const mockedCategoryUpdate = {
  name: "Jardim"
}

export const mockedProviderSchedule = {
  
  day: 5,
  initHour: "05:00",
  limitHour: "20:00"
  
}

export const mockedProviderScheduleNoDay = {
  
  initHour: "05:00",
  limitHour: "20:00"
  
}

export const mockedProviderScheduleUpdate = {

  initHour: "08:00",
  limitHour: "12:00"
  
}

export let mockedSchedule = {

  hour: "10:00",
  serviceDate: "2021-12-05",
  description: "Lavar o carro",
  providerId: "",
  addressId: ""

}

export const mockedScheduleUpdate = {
  hour:  "12:00"
}