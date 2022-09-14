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

`POST /login - FORMATO DA RESPOSTA - STATUS 200`

O Token deverá receber:
id do usuário
isAdm

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDcxODM3NzYsImV4cCI6MTYwNzQ0Mjk3Niwic3ViIjoiMmE3NWUxMmQtZmQxYy00ODFkLWJhODgtNGQ4YjE3MTAzYjJhIn0.UY67X23mPYAAzT43uFWZDHPUakd2STo5w4AuOcppkyQ"
}
```

#

<h2 align ='center'> Cadastrando usuário </h2>

#

`POST /user - FORMATO DA REQUISIÇÃO`

Na criação do usuário no frontEnd não será dada a opção do isAdm

```json
{
  "imageUrl": "url de imagem",
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
  "imageUrl": "url de imagem",
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
  "id": "6cf9e0fc-ec9e-4624-8e7f-df41c2cc86c9",
  "name": "Tales",
  "email": "matheusfalse@gmail.com",
  "password": "$2a$10$WJM9Yd0YLucBcEAdDFTCo.OlzYnJ2au/nepy/3KM2qfPynt0nty/2",
  "phone": "88888888",
  "imageUrl": null,
  "isActive": true,
  "isAdm": false,
  "createdAt": "2022-09-13T19:22:19.769Z",
  "updatedAt": "2022-09-13T19:22:19.769Z",
  "schedules": [
    {
      "id": "7bc47403-efb0-46d9-9228-8a4e38ed7ba2",
      "hour": "08:00:00",
      "finishServiceHour": "20:00:00",
      "serviceDate": "2020-12-03",
      "createdAt": "2022-09-13T19:24:17.245Z",
      "serviceDescription": "Arrumar o cano NA CASA DA MAE",
      "value": "50.00",
      "clientConfirmed": false,
      "providerConfirmed": false,
      "address": {
        "id": "3d519d55-eb46-49fb-9480-1a18c9e07db8",
        "state": "PE",
        "city": "Recife",
        "zipCode": "12345678",
        "number": "2222",
        "street": "rua 12222222222",
        "district": "Teste",
        "complement": null
      }
    }
  ],
  "feedbacks": []
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
  "imageUrl": "url de imagem",
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
  "imageUrl": "url de imagem",
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
  "imageUrl": "url de imagem",
  "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "email": "exemplo@gmail.com",
  "name": "Mateus Willcox",
  "phone": "32098765456",
  "isPremium": false,
  "isActive": true,
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
  "id": "5f0c4073-a5b4-47ec-b460-cd82823587ab",
  "name": "Tales",
  "email": "talesdapiscina2@gmail.com",
  "phone": "32098765456",
  "imageUrl": null,
  "isActive": true,
  "isPremium": false,
  "createdAt": "2022-09-14T13:02:49.249Z",
  "updatedAt": "2022-09-14T13:02:49.249Z",
  "address": {
    "id": "6b40b1d9-9873-4151-9f55-1536413f4930",
    "state": "SP",
    "city": "Praia Grande",
    "zipCode": "12345678",
    "number": "32",
    "street": "Avenida paris2s22",
    "district": "Bairro tal",
    "complement": "Portão azul"
  },
  "providerCategories": [],
  "schedules": [],
  "feedbacks": [],
  "providerSchedule": []
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

	{
		"id": "7b142e0e-c89c-4600-a7b8-29c48c87c60a",
		"name": "Tales",
		"email": "tales@gmail.com.br",
		"phone": "32098765456",
		"imageUrl": null,
		"isActive": true,
		"isPremium": false,
		"createdAt": "2022-09-13T17:43:45.444Z",
		"updatedAt": "2022-09-13T17:43:45.444Z",
		"address": {
			"id": "55281d1a-5482-49a3-b9f3-88976848afd0",
			"state": "SP",
			"city": "Praia Grande",
			"zipCode": "12345678",
			"number": "32",
			"street": "Avenida pariss",
			"district": "Bairro tal",
			"complement": "Portão azul"
		},
		"providerCategories": [],
		"schedules": [
			{
				"id": "2dda45b9-922a-4480-baad-af065ea2a608",
				"hour": "08:00:00",
				"finishServiceHour": "20:00:00",
				"serviceDate": "2020-12-05",
				"createdAt": "2022-09-13T17:54:57.903Z",
				"serviceDescription": "Arrumar o cano",
				"value": "50.00",
				"clientConfirmed": false,
				"providerConfirmed": false,
				"address": {
					"id": "4b8e7106-f3cf-4570-8156-dc8d8abfa32b",
					"state": "PE",
					"city": "Recife",
					"zipCode": "12345678",
					"number": "22",
					"street": "rua 12",
					"district": "Teste",
					"complement": null
				}
      , 	{
		"id": "7b142e0e-c89c-4600-a7b8-29c48c87c60a",
		"name": "Tales",
		"email": "tales@gmail.com.br",
		"phone": "32098765456",
		"imageUrl": null,
		"isActive": true,
		"isPremium": false,
		"createdAt": "2022-09-13T17:43:45.444Z",
		"updatedAt": "2022-09-13T17:43:45.444Z",
		"address": {
			"id": "55281d1a-5482-49a3-b9f3-88976848afd0",
			"state": "SP",
			"city": "Praia Grande",
			"zipCode": "12345678",
			"number": "32",
			"street": "Avenida pariss",
			"district": "Bairro tal",
			"complement": "Portão azul"
		},
		"providerCategories": [],
		"schedules": [
			{
				"id": "2dda45b9-922a-4480-baad-af065ea2a608",
				"hour": "08:00:00",
				"finishServiceHour": "20:00:00",
				"serviceDate": "2020-12-05",
				"createdAt": "2022-09-13T17:54:57.903Z",
				"serviceDescription": "Arrumar o cano",
				"value": "50.00",
				"clientConfirmed": false,
				"providerConfirmed": false,
				"address": {
					"id": "4b8e7106-f3cf-4570-8156-dc8d8abfa32b",
					"state": "PE",
					"city": "Recife",
					"zipCode": "12345678",
					"number": "22",
					"street": "rua 12",
					"district": "Teste",
					"complement": null
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
  "id": "5f0c4073-a5b4-47ec-b460-cd82823587ab",
  "name": "Tales Carneiro da Silva",
  "email": "talesdapiscina2@gmail.com",
  "password": "$2a$10$9XxSW8..b.MlAg1ey7.50.3GYUoaFUIX7pmhxhwP9cY1mGLUIu6Rq",
  "phone": "32098765456",
  "imageUrl": null,
  "isActive": true,
  "isPremium": false,
  "createdAt": "2022-09-14T13:02:49.249Z",
  "updatedAt": "2022-09-14T13:14:09.002Z",
  "address": {
    "id": "6b40b1d9-9873-4151-9f55-1536413f4930",
    "state": "SP",
    "city": "Praia Grande",
    "zipCode": "12345678",
    "number": "32",
    "street": "Avenida paris2s22",
    "district": "Bairro tal",
    "complement": "Portão azul"
  },
  "providerCategories": [],
  "schedules": [],
  "feedbacks": [],
  "providerSchedule": []
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

`GET /address - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN
Somente o próprio usuário ou o adm tem acesso a essa rota
Caso o token seja de usuário, lista todos os seus endereços, caso seja um token de adm, lista todos os endereços de todos os usuários.

### Caso esteja tudo ok a resposta será assim:

`GET /address - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "id": "9fd15bc5-0b8f-4462-a597-06736aa98488",
    "address": {
      "id": "3d519d55-eb46-49fb-9480-1a18c9e07db8",
      "state": "PE",
      "city": "Recife",
      "zipCode": "12345678",
      "number": "2222",
      "street": "rua 12222222222",
      "district": "Teste",
      "complement": null
    }
  },
  {
    "id": "fa4e979c-3103-47eb-ab66-368ff3c9a21f",
    "address": {
      "id": "a397cb04-f3a7-43fd-84d0-ea68bf00e1eb",
      "state": "PE",
      "city": "Recife",
      "zipCode": "12345678",
      "number": "2222",
      "street": "rua teste 123",
      "district": "Teste",
      "complement": null
    }
  }
]
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
  "message": "Category updated"
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
  "day": 4
}
```

### Caso esteja tudo ok a resposta será assim:

`POST /providerSchedule - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "cc909411-c4cc-4efa-9fea-f21c368e080e",
  "dayHours": {
    "id": "a77d7823-4a75-407f-a6c2-5d94c87ad76c",
    "day": 4,
    "initHour": "2022-09-14T12:00:15.271Z",
    "limitHour": "2022-09-14T15:00:15.281Z"
  },
  "provider": {
    "id": "af04a62f-ce5a-4764-8bc5-10ead4fbe92e",
    "name": "Tales",
    "email": "provider@provider.com",
    "password": "$2a$10$MQ9JlWdvFBueddI09OIq5urGxxgQ2oiIdBaHVStp2kR2/0XASvzXq",
    "phone": "32098765456",
    "imageUrl": null,
    "isActive": true,
    "isPremium": false,
    "createdAt": "2022-09-14T16:34:04.912Z",
    "updatedAt": "2022-09-14T16:34:04.912Z",
    "address": {
      "id": "6db4d545-ce4d-4004-b299-a2592f0ecb1a",
      "state": "SP",
      "city": "Praia Grande",
      "zipCode": "12345678",
      "number": "32",
      "street": "Avenida p",
      "district": "Bairro tal",
      "complement": "Portão azul"
    },
    "providerCategories": [],
    "schedules": [],
    "feedbacks": [],
    "providerSchedule": []
  }
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
  "day": 4
}
```

### Caso esteja tudo ok a resposta será assim:

`PATCH /providerSchedule/:providerScheduleId - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "message": "Day hours updated"
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
  "value": 0,
  "clientConfirmed": false,
  "providerConfirmed": false,
  "finishServiceHour": "20:00",
  "providerId": "af04a62f-ce5a-4764-8bc5-10ead4fbe92e",
  "addressId": "6db4d545-ce4d-4004-b299-a2592f0ecb1a"
}
```

### Caso esteja tudo ok a resposta será assim:

`POST /schedule - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "hour": "08:00",
  "finishServiceHour": "20:00",
  "serviceDate": "2020-12-05",
  "serviceDescription": "Arrumar o cano",
  "value": 50,
  "provider": {
    "id": "af04a62f-ce5a-4764-8bc5-10ead4fbe92e",
    "name": "Tales",
    "email": "provider@provider.com",
    "phone": "32098765456",
    "imageUrl": null,
    "isActive": true,
    "isPremium": false,
    "createdAt": "2022-09-14T16:34:04.912Z",
    "updatedAt": "2022-09-14T16:34:04.912Z",
    "address": {
      "id": "6db4d545-ce4d-4004-b299-a2592f0ecb1a",
      "state": "SP",
      "city": "Praia Grande",
      "zipCode": "12345678",
      "number": "32",
      "street": "Avenida p",
      "district": "Bairro tal",
      "complement": "Portão azul"
    },
    "providerCategories": [],
    "schedules": [],
    "feedbacks": [],
    "providerSchedule": []
  },
  "address": {
    "id": "6db4d545-ce4d-4004-b299-a2592f0ecb1a",
    "state": "SP",
    "city": "Praia Grande",
    "zipCode": "12345678",
    "number": "32",
    "street": "Avenida p",
    "district": "Bairro tal",
    "complement": "Portão azul"
  },
  "user": {
    "id": "9d16907e-f21f-4b16-8568-f15640d7dec1",
    "name": "Tales",
    "email": "user@user.com",
    "phone": "88888888",
    "imageUrl": null,
    "isActive": true,
    "isAdm": false,
    "createdAt": "2022-09-14T13:39:24.729Z",
    "updatedAt": "2022-09-14T13:39:24.729Z",
    "schedules": [],
    "feedbacks": []
  },
  "id": "7ef1b6fd-3646-4837-9f51-5b8bc5dbae3f",
  "createdAt": "2022-09-14T16:41:14.672Z",
  "clientConfirmed": false,
  "providerConfirmed": false
}
```

#

<h2 align ='center'> Consultando schedule </h2>

#

`GET /schedule/:scheduleId - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e só pode ser acessado pelo usuário e provider envolvidos ou um adm

Essa requisição não requer um corpo

### Caso esteja tudo ok a resposta será assim:

`GET /schedule/:scheduleId - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "7ef1b6fd-3646-4837-9f51-5b8bc5dbae3f",
  "hour": "08:00:00",
  "finishServiceHour": "20:00:00",
  "serviceDate": "2020-12-05",
  "createdAt": "2022-09-14T16:41:14.672Z",
  "serviceDescription": "Arrumar o cano",
  "value": "50.00",
  "clientConfirmed": false,
  "providerConfirmed": false,
  "user": {
    "id": "9d16907e-f21f-4b16-8568-f15640d7dec1",
    "name": "Tales",
    "email": "user@user.com",
    "password": "$2a$10$V/eEZMJAtR4Lb8sNEjCg3OJx2KaYglwd79HxoIFprYIYP1wyd2H2i",
    "phone": "88888888",
    "imageUrl": null,
    "isActive": true,
    "isAdm": false,
    "createdAt": "2022-09-14T13:39:24.729Z",
    "updatedAt": "2022-09-14T13:39:24.729Z",
    "schedules": [
      {
        "id": "7ef1b6fd-3646-4837-9f51-5b8bc5dbae3f",
        "hour": "08:00:00",
        "finishServiceHour": "20:00:00",
        "serviceDate": "2020-12-05",
        "createdAt": "2022-09-14T16:41:14.672Z",
        "serviceDescription": "Arrumar o cano",
        "value": "50.00",
        "clientConfirmed": false,
        "providerConfirmed": false
      }
    ],
    "feedbacks": []
  },
  "provider": {
    "id": "af04a62f-ce5a-4764-8bc5-10ead4fbe92e",
    "name": "Tales",
    "email": "provider@provider.com",
    "password": "$2a$10$MQ9JlWdvFBueddI09OIq5urGxxgQ2oiIdBaHVStp2kR2/0XASvzXq",
    "phone": "32098765456",
    "imageUrl": null,
    "isActive": true,
    "isPremium": false,
    "createdAt": "2022-09-14T16:34:04.912Z",
    "updatedAt": "2022-09-14T16:34:04.912Z",
    "address": {
      "id": "6db4d545-ce4d-4004-b299-a2592f0ecb1a",
      "state": "SP",
      "city": "Praia Grande",
      "zipCode": "12345678",
      "number": "32",
      "street": "Avenida p",
      "district": "Bairro tal",
      "complement": "Portão azul"
    },
    "providerCategories": [],
    "schedules": [
      {
        "id": "7ef1b6fd-3646-4837-9f51-5b8bc5dbae3f",
        "hour": "08:00:00",
        "finishServiceHour": "20:00:00",
        "serviceDate": "2020-12-05",
        "createdAt": "2022-09-14T16:41:14.672Z",
        "serviceDescription": "Arrumar o cano",
        "value": "50.00",
        "clientConfirmed": false,
        "providerConfirmed": false
      }
    ],
    "feedbacks": [],
    "providerSchedule": []
  },
  "address": {
    "id": "6db4d545-ce4d-4004-b299-a2592f0ecb1a",
    "state": "SP",
    "city": "Praia Grande",
    "zipCode": "12345678",
    "number": "32",
    "street": "Avenida p",
    "district": "Bairro tal",
    "complement": "Portão azul"
  }
}
```

#

<h2 align ='center'> Editando schedule </h2>

#

`PATCH /schedule/:scheduleId - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e só pode ser acessado pelo usuário e provider envolvidos ou um adm

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
  "id": "e17ecdd5-79a8-4f38-8180-78129441e032",
  "hour": "08:00:00",
  "finishServiceHour": "20:00:00",
  "serviceDate": "2020-12-05",
  "createdAt": "2022-09-14T16:53:35.816Z",
  "serviceDescription": "Arrumar o computador",
  "value": "100.00",
  "clientConfirmed": true,
  "providerConfirmed": true,
  "user": {
    "id": "599b46b4-f4b7-48be-913b-9f034348c3ad",
    "name": "Tales",
    "email": "user@user.com",
    "phone": "88888888",
    "imageUrl": null,
    "isActive": true,
    "isAdm": false,
    "createdAt": "2022-09-14T13:51:45.732Z",
    "updatedAt": "2022-09-14T13:51:45.732Z",
    "schedules": [
      {
        "id": "e17ecdd5-79a8-4f38-8180-78129441e032",
        "hour": "08:00:00",
        "finishServiceHour": "20:00:00",
        "serviceDate": "2020-12-05",
        "createdAt": "2022-09-14T16:53:35.816Z",
        "serviceDescription": "Arrumar o computador",
        "value": "100.00",
        "clientConfirmed": true,
        "providerConfirmed": true
      }
    ],
    "feedbacks": []
  },
  "provider": {
    "id": "90375916-6c93-4057-9204-19e8c4efd4ab",
    "name": "Tales",
    "email": "provider@provider.com",
    "phone": "32098765456",
    "imageUrl": null,
    "isActive": true,
    "isPremium": false,
    "createdAt": "2022-09-14T16:51:40.129Z",
    "updatedAt": "2022-09-14T16:51:40.129Z",
    "address": {
      "id": "fa32e3d1-58eb-4f2d-acd4-10998acd932d",
      "state": "SP",
      "city": "Praia Grande",
      "zipCode": "12345678",
      "number": "32",
      "street": "Avenida p",
      "district": "Bairro tal",
      "complement": "Portão azul"
    },
    "providerCategories": [],
    "schedules": [
      {
        "id": "e17ecdd5-79a8-4f38-8180-78129441e032",
        "hour": "08:00:00",
        "finishServiceHour": "20:00:00",
        "serviceDate": "2020-12-05",
        "createdAt": "2022-09-14T16:53:35.816Z",
        "serviceDescription": "Arrumar o computador",
        "value": "100.00",
        "clientConfirmed": true,
        "providerConfirmed": true
      }
    ],
    "feedbacks": [],
    "providerSchedule": []
  },
  "address": {
    "id": "84086e1a-abb9-4506-9ba5-a2bbb56d0256",
    "state": "PE",
    "city": "Recife",
    "zipCode": "12345678",
    "number": "22",
    "street": "rua 1",
    "district": "Teste",
    "complement": null
  }
}
```

#

<h2 align ='center'> Apagando schedule </h2>

#

`DELETE /schedule/:scheduleId - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e só pode ser acessado pelo usuário e provider envolvidos ou um adm

Essa rota não requer um corpo na requisição

### Caso esteja tudo ok a resposta será assim:

`DELETE /schedule/:scheduleId - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "message": "Schedule deleted"
}
```

#

<h2 align ='center'> Criando service </h2>

#

`POST /service- FORMATO DA REQUISIÇÃO`

Rota precisa de um TOKEN

```json
{
  "scheduleId": "21d5c1f0-5b39-4aeb-837d-b4b237da3a3b"
}
```

### Caso esteja tudo ok a resposta será assim:

`POST /service - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "schedule": {
    "id": "21d5c1f0-5b39-4aeb-837d-b4b237da3a3b",
    "hour": "08:00:00",
    "finishServiceHour": "20:00:00",
    "serviceDate": "2020-12-05",
    "createdAt": "2022-09-14T17:18:00.524Z",
    "serviceDescription": "Arrumar o computador",
    "value": "30.00",
    "clientConfirmed": true,
    "providerConfirmed": true,
    "address": {
      "id": "84086e1a-abb9-4506-9ba5-a2bbb56d0256",
      "state": "PE",
      "city": "Recife",
      "zipCode": "12345678",
      "number": "22",
      "street": "rua 1",
      "district": "Teste",
      "complement": null
    }
  },
  "finalizedAt": null,
  "id": "4a0c2d0e-0ddb-4ebb-8129-8d65398fc349",
  "isServiceFinished": false,
  "isServiceCanceled": false,
  "clientFinished": false,
  "providerFinished": false
}
```

#

<h2 align ='center'> Listando services </h2>

#

`GET /service - FORMATO DA REQUISIÇÃO`

rota precisa de um TOKEN e não é necessário corpo da requisição

### Caso esteja tudo ok a resposta será assim:

`GET /service - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "4a0c2d0e-0ddb-4ebb-8129-8d65398fc349",
  "isServiceFinished": false,
  "isServiceCanceled": false,
  "finalizedAt": null,
  "clientFinished": false,
  "providerFinished": false,
  "schedule": {
    "id": "21d5c1f0-5b39-4aeb-837d-b4b237da3a3b",
    "hour": "08:00:00",
    "finishServiceHour": "20:00:00",
    "serviceDate": "2020-12-05",
    "createdAt": "2022-09-14T17:18:00.524Z",
    "serviceDescription": "Arrumar o computador",
    "value": "30.00",
    "clientConfirmed": true,
    "providerConfirmed": true,
    "user": {
      "id": "599b46b4-f4b7-48be-913b-9f034348c3ad",
      "name": "Tales",
      "email": "user@user.com",
      "password": "$2a$10$XN9hw1UDhI2yJBNk8hNDP.TqFyYuX8td5KWcFbmiQcqX7rysfuBbm",
      "phone": "88888888",
      "imageUrl": null,
      "isActive": true,
      "isAdm": false,
      "createdAt": "2022-09-14T13:51:45.732Z",
      "updatedAt": "2022-09-14T13:51:45.732Z",
      "schedules": [
        {
          "id": "21d5c1f0-5b39-4aeb-837d-b4b237da3a3b",
          "hour": "08:00:00",
          "finishServiceHour": "20:00:00",
          "serviceDate": "2020-12-05",
          "createdAt": "2022-09-14T17:18:00.524Z",
          "serviceDescription": "Arrumar o computador",
          "value": "30.00",
          "clientConfirmed": true,
          "providerConfirmed": true
        }
      ],
      "feedbacks": []
    },
    "provider": {
      "id": "90375916-6c93-4057-9204-19e8c4efd4ab",
      "name": "Tales",
      "email": "provider@provider.com",
      "phone": "32098765456",
      "imageUrl": null,
      "isActive": true,
      "isPremium": false,
      "createdAt": "2022-09-14T16:51:40.129Z",
      "updatedAt": "2022-09-14T16:51:40.129Z",
      "address": {
        "id": "fa32e3d1-58eb-4f2d-acd4-10998acd932d",
        "state": "SP",
        "city": "Praia Grande",
        "zipCode": "12345678",
        "number": "32",
        "street": "Avenida p",
        "district": "Bairro tal",
        "complement": "Portão azul"
      },
      "providerCategories": [],
      "schedules": [
        {
          "id": "21d5c1f0-5b39-4aeb-837d-b4b237da3a3b",
          "hour": "08:00:00",
          "finishServiceHour": "20:00:00",
          "serviceDate": "2020-12-05",
          "createdAt": "2022-09-14T17:18:00.524Z",
          "serviceDescription": "Arrumar o computador",
          "value": "30.00",
          "clientConfirmed": true,
          "providerConfirmed": true
        }
      ],
      "feedbacks": [],
      "providerSchedule": []
    },
    "address": {
      "id": "84086e1a-abb9-4506-9ba5-a2bbb56d0256",
      "state": "PE",
      "city": "Recife",
      "zipCode": "12345678",
      "number": "22",
      "street": "rua 1",
      "district": "Teste",
      "complement": null
    }
  },
  "feedbacks": []
}
```

#

<h2 align ='center'> Editando services </h2>

#

`PATH /service/:serviceId - FORMATO DA REQUISIÇÃO`

#

Rota precisa de um TOKEN e cada usuário só pode editar as informações referentes a ele mesmo

```json
{
  "providerFinished": true,
  "clientFinished": true,
  "isServiceFinished": false,
  "isServiceCanceled": false
}
```

### Caso esteja tudo ok a resposta será assim:

`PATH /service/:serviceId - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "4a0c2d0e-0ddb-4ebb-8129-8d65398fc349",
  "isServiceFinished": false,
  "isServiceCanceled": false,
  "finalizedAt": null,
  "clientFinished": true,
  "providerFinished": true,
  "schedule": {
    "id": "21d5c1f0-5b39-4aeb-837d-b4b237da3a3b",
    "hour": "08:00:00",
    "finishServiceHour": "20:00:00",
    "serviceDate": "2020-12-05",
    "createdAt": "2022-09-14T17:18:00.524Z",
    "serviceDescription": "Arrumar o computador",
    "value": "30.00",
    "clientConfirmed": true,
    "providerConfirmed": true,
    "address": {
      "id": "84086e1a-abb9-4506-9ba5-a2bbb56d0256",
      "state": "PE",
      "city": "Recife",
      "zipCode": "12345678",
      "number": "22",
      "street": "rua 1",
      "district": "Teste",
      "complement": null
    }
  },
  "feedbacks": []
}
```

#

<h2 align ='center'> Deletando services </h2>

#

`DELETE /service/:serviceId - FORMATO DA REQUISIÇÃO`

Esta rota precisa de um token e só pode ser acessada por um adm

### Caso esteja tudo ok o retorno será assim:

`DELETE /service/:serviceId - FORMATO DA RESPOSTA`

```json
{
  "message": "Service deleted"
}
```

#

<h2 align ='center'> Criando feedbacks de clients </h2>

#

`POST /clientsFeedbacks - FORMATO DA REQUISIÇÃO`

Na requisição é necessário o TOKEN e só pode ser acessado pelo usuário e provider envolvidos ou um adm

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
  "note": 1,
  "comment": "Muito bom",
  "id": "ad0e831f-76de-4f9d-b770-5a92b5ee63b4"
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
    "comment": "Ótimo cliente"
  },
  {
    "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
    "note": "5",
    "comment": "Ótimo cliente"
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
  "note": 5,
  "comment": "Ótimo profissional",
  "serviceId": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
  "providerId": "c110dbb6-beb9-4682-ab63-2c12a570d66b"
}
```

### Caso esteja tudo ok a resposta será assim:

`POST /servicesFeedbacks - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "note": "5",
  "comment": "Ótimo profissional",
  "service": {
    "id": "bbb89f82-46f0-4490-97e8-6884656e6b47",
    "isServiceFinished": true,
    "isServiceCanceled": false,
    "finalizedAt": null,
    "clientFinished": false,
    "providerFinished": false,
    "schedule": {
      "id": "4b51ddec-5033-43b5-832f-443fd540d192",
      "hour": "08:00:00",
      "finishServiceHour": "20:00:00",
      "serviceDate": "2020-12-05",
      "createdAt": "2022-09-14T17:48:37.320Z",
      "serviceDescription": "Arrumar o computador",
      "value": "30.00",
      "clientConfirmed": true,
      "providerConfirmed": true,
      "address": {
        "id": "84086e1a-abb9-4506-9ba5-a2bbb56d0256",
        "state": "PE",
        "city": "Recife",
        "zipCode": "12345678",
        "number": "22",
        "street": "rua 1",
        "district": "Teste",
        "complement": null
      }
    },
    "feedbacks": []
  }
}
```

#

<h2 align ='center'> Acessando services feedbacks </h2>

#

`GET /servicesFeedbacks/:providerId - FORMATO DA REQUISIÇÃO`

Essa rota precisa de um TOKEN

Essa rota não tem corpo de requisição

### Caso esteja tudo ok a resposta será assim:

`GET /servicesFeedbacks/:providerId - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
    "note": "5",
    "comment": "Ótimo profissional"
  },
  {
    "id": "c110dbb6-beb9-4682-ab63-2c12a570d66b",
    "note": "5",
    "comment": "Ótimo profissional"
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
  "comment": "Ótimo profissional"
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
