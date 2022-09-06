# TercerizAi API

Este é o backend da aplicação TercerizAi - Uma plataforma de intermediação entre prestadores e consumidores, visando facilitar a relação entre ambos.
Api construida utilizando as tecnologias adquiridas no módulo 4 do curso fullStack da Kenzie Academy Brasil.

# Endpoints

O JSON para utilizar no Insomnia é este aqui ->

A API tem um total de XXX endpoints

A url base da API é:

# Rotas

#

<h2 align ='center'> Login </h2>

#

`POST /login - FORMATO DA REQUISIÇÃO`

```json
{
  "email": "exemplo@gmail.com",
  "password": "432423!@aa"
}
```

### Caso esteja tudo ok a resposta será assim:

`POST /login - FORMATO DA RESPOSTA - STATUS 201`

O Token deverá receber:
id do usuário
isAdm
userType: customer ou provider

```json
{
  "userId": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDcxODM3NzYsImV4cCI6MTYwNzQ0Mjk3Niwic3ViIjoiMmE3NWUxMmQtZmQxYy00ODFkLWJhODgtNGQ4YjE3MTAzYjJhIn0.UY67X23mPYAAzT43uFWZDHPUakd2STo5w4AuOcppkyQ"
}
```

#

<h2 align ='center'> Cadastrando usuário </h2>

#

`POST /user - FORMATO DA REQUISIÇÃO`

```json
{
  "email": "exemplo@gmail.com",
  "name": "Mateus Willcox",
  "phone": "32098765456",
  "password": "432423!@aa",
  "isAdm": true
}
```

### Caso esteja tudo ok a resposta será assim:

`POST /user - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "email": "exemplo@gmail.com",
  "name": "Mateus Willcox",
  "phone": "32098765456",
  "createdAt": "2020-12-05T14:38:02.019Z",
  "updatedAt": "2020-12-05T14:38:02.019Z",
  "isAdm": false,
  "isActive": true
}
```

#

<h2 align ='center'> Buscando perfil do usuário </h2>

#

`GET /users/:id - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e o id na url
Somente o próprio usuário ou o adm tem acesso a essa rota

### Caso esteja tudo ok a resposta será assim:

`GET /users/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "email": "exemplo@gmail.com",
  "name": "Matheus Willcox",
  "phone": "32098765456",
  "createdAt": "2020-12-05T14:38:02.019Z",
  "updatedAt": "2020-12-05T14:38:02.019Z",
  "isAdm": false,
  "addresses": [{}, {}]
}
```

#

<h2 align ='center'> Editando usuário </h2>

#

`PATCH /users/:id - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e o id na url
Somente o próprio usuário e o adm tem acesso a essa rota

Os campos que podem ser editados são os seguintes, não sendo necessário passar todas as informações, somente a que deseja editar.

```json
{
  "email": "exemplo@gmail.com",
  "name": "Mateus Willcox",
  "password": "1234",
  "phone": "32098765456"
}
```

### Caso esteja tudo ok a resposta será assim:

`PATCH /users/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "email": "exemplo@gmail.com",
  "name": "Mateus Willcox",
  "phone": "32098765456",
  "createdAt": "2020-12-05T14:38:02.019Z",
  "updatedAt": "2020-13-05T14:38:02.019Z"
}
```

#

<h2 align ='center'> Deletando usuário </h2>

#

`DELETE /users/:id - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e o id na url
Somente o próprio usuário ou o adm tem acesso a essa rota
Esta rota faz um soft delete do usuário

### Caso esteja tudo ok a resposta será assim:

`DELETE /users/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "message": "User deleted"
}
```

#

<h2 align ='center'> Cadastrando prestador de serviço </h2>

#

`POST /provider - FORMATO DA REQUISIÇÃO`

```json
{
  "email": "exemplo@gmail.com",
  "name": "Matheus Willcox",
  "phone": "32098765456",
  "password": "432423!@aa",
  "isPremium": false,
  "address": {
    "state": "PE",
    "street": "Rua tal",
    "district": "Bairro tal",
    "number": "32",
    "complement": "Portão azul",
    "city": "Recife",
    "zipCode": "12345678"
  }
}
```

### Caso esteja tudo ok a resposta será assim:

`POST /provider - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "email": "exemplo@gmail.com",
  "name": "Mateus Willcox",
  "phone": "32098765456",
  "isPremium": false,
  "address": {
    "state": "PE",
    "street": "Rua tal",
    "district": "Bairro tal",
    "number": "32",
    "complement": "Portão azul",
    "city": "Recife",
    "zipCode": "12345678"
  },
  "createdAt": "2020-12-05T14:38:02.019Z",
  "updatedAt": "2020-12-05T14:38:02.019Z"
}
```

#

<h2 align ='center'> Buscando perfil do prestador de serviço </h2>

#

`GET /provider/:id - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e o id na url
Somente o próprio usuário ou o adm tem acesso a essa rota

### Caso esteja tudo ok a resposta será assim:

`GET /provider/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "email": "exemplo@gmail.com",
  "name": "Mateus Willcox",
  "phone": "32098765456",
  "isPremium": false,
  "addressId": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "createdAt": "2020-12-05T14:38:02.019Z",
  "updatedAt": "2020-12-05T14:38:02.019Z",
  "addresses": {
    "state": "PE",
    "street": "Rua tal",
    "district": "Bairro tal",
    "number": "32",
    "complement": "Portão azul",
    "city": "Recife",
    "zipCode": "12345678"
  },
  "categories": [{}, {}],
  "providerSchedule": {
    "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
    "limitHour": "08:00",
    "initHour": "18:00",
    "weekDays": [1, 2, 3, 4, 5]
  }
}
```

#

<h2 align ='center'> Listando os prestadores de serviço </h2>

#

`GET /provider - FORMATO DA REQUISIÇÃO`

Não tem corpo de requisição

### Caso esteja tudo ok a resposta será assim:

Irá retornar um array com todos os providers

`GET /provider - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
    "email": "exemplo@gmail.com",
    "name": "Mateus Willcox",
    "phone": "32098765456",
    "isPremium": false,
    "addressId": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
    "createdAt": "2020-12-05T14:38:02.019Z",
    "updatedAt": "2020-12-05T14:38:02.019Z",
    "addresses": {
      "state": "PE",
      "district": "Bairro tal",
      "city": "Recife"
    },
    "categories": [{}, {}],
    "schedule": {
      "limitHour": "08:00",
      "initHour": "18:00",
      "weekDays": [1, 2, 3, 4, 5]
    }
  },
  {
    "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
    "email": "exemplo@gmail.com",
    "name": "Mateus Willcox",
    "phone": "32098765456",
    "isPremium": false,
    "addressId": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
    "createdAt": "2020-12-05T14:38:02.019Z",
    "updatedAt": "2020-12-05T14:38:02.019Z",
    "addresses": {
      "state": "PE",
      "district": "Bairro tal",
      "city": "Recife"
    },
    "categories": [{}, {}],
    "schedule": {
      "limitHour": "08:00",
      "initHour": "18:00",
      "weekDays": [1, 2, 3, 4, 5]
    }
  }
]
```

#

<h2 align ='center'> Editando prestador de serviço </h2>

#

`PATCH /provider/:id - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e o id na url
Somente o próprio usuário ou adm tem acesso a essa rota

Os campos que podem ser editados são os seguintes, não sendo necessário passar todas as informações, somente a que deseja editar.

```json
{
  "email": "exemplo@gmail.com",
  "name": "Mateus Willcox",
  "phone": "32098765456",
  "password": "432423!@aa",
  "isPremium": false
}
```

### Caso esteja tudo ok a resposta será assim:

`PATCH /provider/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "email": "exemplo@gmail.com",
  "name": "Mateus Willcox",
  "phone": "32098765456",
  "createdAt": "2020-12-05T14:38:02.019Z",
  "updatedAt": "2020-13-05T14:38:02.019Z",
  "isPremium": false
}
```

#

<h2 align ='center'> Apagando prestador de serviço </h2>

#

`DELETE /provider/:id - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e o id na url
Somente o próprio usuário ou o adm tem acesso a essa rota
Esta rota faz um soft delete do usuário

### Caso esteja tudo ok a resposta será assim:

`DELETE /provider/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "message": "Provider deleted"
}
```

#

<h2 align ='center'> Criando endereço</h2>

#

`POST /address - FORMATO DA REQUISIÇÃO`

Caso o usuário que está fazendo a requisição seja um customer as informações de userId e addressId deverão ser passadas para a atabela pivô

```json
{
  "state": "PE",
  "street": "Rua tal",
  "district": "Bairro tal",
  "number": "32",
  "complement": "Portão azul",
  "city": "Recife",
  "zipCode": "12345678"
}
```

### Caso esteja tudo ok a resposta será assim:

`POST /address - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "state": "PE",
  "street": "Rua tal",
  "district": "Bairro tal",
  "number": "32",
  "complement": "Portão azul",
  "city": "Recife",
  "zipCode": "12345678"
}
```

#

<h2 align ='center'> Obtendo dados do endereço </h2>

#

`GET /address/:addressId - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e o id do endereço na url
Somente o próprio usuário ou o adm tem acesso a essa rota

### Caso esteja tudo ok a resposta será assim:

`GET /address - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "state": "PE",
  "street": "Rua tal",
  "district": "Bairro tal",
  "number": "32",
  "complement": "Portão azul",
  "city": "Recife",
  "zipCode": "12345678"
}
```

#

<h2 align ='center'> Editando dados do endereço </h2>

#

`PATCH /address/:addressId - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e o id do endereço na url
Somente o próprio usuário ou o adm tem acesso a essa rota

Os campos que podem ser editados são os seguintes, não sendo necessário passar todas as informações, somente a que deseja editar.

```json
{
  "state": "PE",
  "street": "Rua tal",
  "district": "Bairro tal",
  "number": "32",
  "complement": "Portão azul",
  "city": "Recife",
  "zipCode": "12345678"
}
```

### Caso esteja tudo ok a resposta será assim:

`PATCH /address/:addressId - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "state": "PE",
  "street": "Rua tal",
  "district": "Bairro tal",
  "number": "32",
  "complement": "Portão azul",
  "city": "Recife",
  "zipCode": "12345678"
}
```

#

<h2 align ='center'> Apagando dados do endereço </h2>

#

`DELETE /address/:addressId - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e o id do endereço na url
Somente o próprio usuário ou o adm tem acesso a essa rota

Não tem corpo de requisição

### Caso esteja tudo ok a resposta será assim:

`DELETE /address/:addressId - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "message": "Address deleted"
}
```

#

<h2 align ='center'> Criando categoria </h2>

#

`POST /categories - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN
Somente o adm tem acesso a essa rota

```json
{
  "name": "encanador"
}
```

### Caso esteja tudo ok a resposta será assim:

`POST /categories - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "name": "encanador"
}
```

#

<h2 align ='center'> Acessando as categorias </h2>

#

`GET /categories - FORMATO DA REQUISIÇÃO`

Não tem corpo de requisição

### Caso esteja tudo ok a resposta será assim:

`GET /categories - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
    "name": "encanador"
  },
  {
    "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
    "name": "eletricista"
  }
]
```

#

<h2 align ='center'> Editando categoria </h2>

#

`PATCH /categories/:categoryId - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e o id da categoria na url
Somente o adm tem acesso a essa rota

Os campos que podem ser editados são os seguintes, não sendo necessário passar todas as informações, somente a que deseja editar.

```json
{
  "name": "encanador"
}
```

### Caso esteja tudo ok a resposta será assim:

`PATCH /categories/:categoryId - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "name": "encanador"
}
```

#

<h2 align ='center'> Deletando categoria </h2>

#

`DELETE /categories/:categoryId - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e o id da categoria na url
Somente o adm tem acesso a essa rota

Essa rota não tem corpo de requisição

### Caso esteja tudo ok a resposta será assim:

`DELETE /categories/:categoryId - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "message": "Category deleted"
}
```

#

<h2 align ='center'> Criando provider schedule </h2>

#

`POST /providerSchedule - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e ser o provider
Somente o próprio usuário e o adm tem acesso a essa rota

É necessário passar o id do provider na criação da schedule

```json
{
  "limitHour": "08:00",
  "initHour": "18:00",
  "weekDays": [1, 2, 3, 4, 5]
}
```

### Caso esteja tudo ok a resposta será assim:

`POST /providerSchedule - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "limitHour": "08:00",
  "initHour": "18:00",
  "weekDays": [1, 2, 3, 4, 5],
  "providerId": "c110dbb6-beb9-4682-ab63-2c12a570d66b"
}
```

#

<h2 align ='center'> Editando provider schedule </h2>

#

`PATCH /providerSchedule/:providerScheduleId - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e ser o provider
Somente o próprio usuário e o adm tem acesso a essa rota

Os campos que podem ser editados são os seguintes, não sendo necessário passar todas as informações, somente a que deseja editar.

```json
{
  "limitHour": "08:00",
  "initHour": "18:00",
  "weekDays": [1, 2, 3, 4, 5]
}
```

### Caso esteja tudo ok a resposta será assim:

`PATCH /providerSchedule/:providerScheduleId - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "limitHour": "08:00",
  "initHour": "18:00",
  "weekDays": [1, 2, 3, 4, 5]
}
```

#

<h2 align ='center'> Deletando provider schedule </h2>

#

`DELETE /providerSchedule/:providerScheduleId - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e ser o provider
Somente o próprio usuário e o adm tem acesso a essa rota

Esta requisição não tem corpo

### Caso esteja tudo ok a resposta será assim:

`DELETE /providerSchedule/:providerScheduleId - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "message": "Provider Schedule deleted"
}
```

#

<h2 align ='center'> Criando schedule </h2>

#

`POST /schedule - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN

Na criação da schedule é necessário passar o id do usuário

```json
{
  "hour": "08:00",
  "serviceDate": "2020-12-05",
  "description": "Arrumar o cano",
  "value": 50.0,
  "providerId": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "addressId": "c110dbb6-beb9-4682-ab63-2c12a570d66b"
}
```

### Caso esteja tudo ok a resposta será assim:

`POST /schedule - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "hour": "08:00",
  "serviceDate": "2020-12-05",
  "createdAt": "2020-12-05T14:38:02.019Z",
  "description": "Arrumar o cano",
  "value": 50.0,
  "clientConfirmed": false,
  "providerConfirmed": false,
  "providerId": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "address": {
    "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
    "state": "PE",
    "street": "Rua tal",
    "district": "Bairro tal",
    "number": "32",
    "complement": "Portão azul",
    "city": "Recife",
    "zipCode": "12345678"
  }
}
```

#

<h2 align ='center'> Consultando schedule </h2>

#

`GET /schedule/:scheduleId - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e só pode ser acessado pelos usuários envolvidos ou um adm

Essa requisição não requer um corpo

### Caso esteja tudo ok a resposta será assim:

`GET /schedule/:scheduleId - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "hour": "08:00",
  "serviceDate": "2020-12-05",
  "createdAt": "2020-12-05T14:38:02.019Z",
  "description": "Arrumar o cano",
  "value": 50.0,
  "clientConfirmed": false,
  "providerConfirmed": false,
  "providerId": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "userId": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "address": {
    "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
    "state": "PE",
    "street": "Rua tal",
    "district": "Bairro tal",
    "number": "32",
    "complement": "Portão azul",
    "city": "Recife",
    "zipCode": "12345678"
  }
}
```

#

<h2 align ='center'> Editando schedule </h2>

#

`PATCH /schedule/:scheduleId - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e só pode ser acessado pelos usuários envolvidos ou um adm

Os campos que podem ser editados são os seguintes, não sendo necessário passar todas as informações, somente a que deseja editar.

```json
{
  "hour": "08:00",
  "serviceDate": "2020-12-05",
  "description": "Arrumar o cano",
  "value": 50.0,
  "clientConfirmed": false,
  "providerConfirmed": false
}
```

### Caso esteja tudo ok a resposta será assim:

`PATCH /schedule/:scheduleId - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "hour": "08:00",
  "serviceDate": "2020-12-05",
  "description": "Arrumar o cano",
  "value": 50.0,
  "clientConfirmed": false,
  "providerConfirmed": false
}
```

#

<h2 align ='center'> Apagando schedule </h2>

#

`DELETE /schedule/:scheduleId - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e só pode ser acessado pelos usuários envolvidos ou um adm

Essa rota não requer um corpo na requisição

### Caso esteja tudo ok a resposta será assim:

`DELETE /schedule/:scheduleId - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "message": "Schedule deleted"
}
```

#

<h2 align ='center'> Criando feedbacks de clients </h2>

#

`POST /clientsFeedbacks - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e só pode ser acessado pelos usuários envolvidos ou um adm

O id do provider deverá ser passado na ciração do feedback

Note não pode ser menor que zero ou maior que 5

```json
{
  "note": 5,
  "comment": "Ótimo cliente",
  "userId": "c110dbb6-beb9-4682-ab63-2c12a570d66b"
}
```

### Caso esteja tudo ok a resposta será assim:

`POST /clientsFeedbacks - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "note": "5",
  "comment": "Ótimo cliente",
  "userId": "c110dbb6-beb9-4682-ab63-2c12a570d66b"
}
```

#

<h2 align ='center'> Consultando feedbacks de clients </h2>

#

`GET /clientsFeedbacks/:clientId - FORMATO DA REQUISIÇÃO`

Essa rota precisa de TOKEN

Esta rota não tem corpo de requisição

### Caso esteja tudo ok a resposta será assim:

`GET /clientsFeedbacks/:clientId - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
    "note": "5",
    "comment": "Ótimo cliente",
    "userId": "c110dbb6-beb9-4682-ab63-2c12a570d66b"
  },
  {
    "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
    "note": "5",
    "comment": "Ótimo cliente",
    "userId": "c110dbb6-beb9-4682-ab63-2c12a570d66b"
  }
]
```

#

<h2 align ='center'> Editando feedbacks de clients </h2>

#

`PATCH /clientsFeedbacks/:feedbackId - FORMATO DA REQUISIÇÃO`

Essa rota precisa de TOKEN e só pode ser acessada por um adm

```json
{
  "note": "5",
  "comment": "Ótimo cliente"
}
```

### Caso esteja tudo ok a resposta será assim:

`PATCH /clientsFeedbacks/:feedbackId - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "note": "5",
  "comment": "Ótimo cliente"
}
```

#

<h2 align ='center'> Deletando feedbacks de clients </h2>

#

`DELETE /clientsFeedbacks/:feedbackId - FORMATO DA REQUISIÇÃO`

Essa rota precisa de TOKEN e só pode ser acessada por um adm

Esta rota não tem corpo de requisição

`DELETE /clientsFeedbacks/:feedbackId - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "message": "Feedback deleted"
}
```

#

<h2 align ='center'> Criando services feedbacks </h2>

#

`POST /servicesFeedbacks - FORMATO DA REQUISIÇÃO`

Essa rota precisa de um TOKEN e só pode ser acessada pelo cliente ligado ao serviço

o id do cliente deverá ser passado no service quando a tabela for criada

```json
{
  "note": "5",
  "comment": "Ótimo profissional",
  "serviceId": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "providerId": "c110dbb6-beb9-4682-ab63-2c12a570d66b"
}
```

### Caso esteja tudo ok a resposta será assim:

`POST /servicesFeedbacks - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "note": "5",
  "comment": "Ótimo profissional",
  "serviceId": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "providerId": "c110dbb6-beb9-4682-ab63-2c12a570d66b"
}
```

#

<h2 align ='center'> Acessando services feedbacks </h2>

#

`GET /servicesFeedbacks - FORMATO DA REQUISIÇÃO`

Essa rota precisa de um TOKEN

Essa rota não tem corpo de requisição

### Caso esteja tudo ok a resposta será assim:

`GET /servicesFeedbacks/:providerId - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
    "note": "5",
    "comment": "Ótimo profissional",
    "serviceId": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
    "providerId": "c110dbb6-beb9-4682-ab63-2c12a570d66b"
  },
  {
    "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
    "note": "5",
    "comment": "Ótimo profissional",
    "serviceId": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
    "providerId": "c110dbb6-beb9-4682-ab63-2c12a570d66b"
  }
]
```

#

<h2 align ='center'> Editando services feedbacks </h2>

#

`PATCH /servicesFeedbacks/serviceFeedbackId - FORMATO DA REQUISIÇÃO`

Essa rota precisa de um TOKEN e só pode ser acessada por um adm

```json
{
  "note": "5",
  "comment": "Ótimo profissional"
}
```

`PATCH /servicesFeedbacks/serviceFeedbackId - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "note": "5",
  "comment": "Ótimo profissional",
  "serviceId": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "providerId": "c110dbb6-beb9-4682-ab63-2c12a570d66b"
}
```

#

<h2 align ='center'> Deletando services feedbacks </h2>

#

`DELETE /servicesFeedbacks/serviceFeedbackId - FORMATO DA REQUISIÇÃO`

Essa rota precisa de um TOKEN e só pode ser acessada por um adm

Essa rota não precisa de um corpo na requisição

`DELETE /servicesFeedbacks/serviceFeedbackId - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "message": "Service feedback deleted"
}
```
