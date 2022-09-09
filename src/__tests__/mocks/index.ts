//aqui ficam os Mocks para testes


//users

export const mockedUserNotAdm = {
    name: "Jorgin",
    email: "jorgin@mail.com",
    password: "1234",
    phone: "4111111111",
    isAdm: false
}

export const mockedUserAdm = {
    name: "Jorge",
    email: "jorge@mail.com",
    password: "1234",
    phone: "4111111111",
    isAdm: true
}

export const mockedUserUpdate = {
    name: "Mateus"
}

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
      zipCode: "12345678"
    }
    
}

export const mockedProviderPremium = {

    email: "exemplo@gmail.com",
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
      zipCode: "12345678"
    }
    
}

  export const mockedProviderWithoutAddress = {

    email: "exemplo@gmail.com",
    name: "Matheus Willcox",
    phone: "32098765456",
    password: "432423!@aa",
    isPremium: false,
  }