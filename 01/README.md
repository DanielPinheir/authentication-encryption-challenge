![](https://i.imgur.com/xG74tOh.png)

# Challenge 01

## API creation with authentication

You have just received a proposal as a freelancer to build an API that will catalog **Pokemons**. However, this is not a simple API, as it will have authentication so that each logged in user can catalog his **Pokemons**.

So let's go to the requirements proposed by the contractor.

1 - There must be a database called `pokemon_catalog` with the tables described below and all the code for creating the tables must be placed in the `dump.sql` file

a) `users` table with the fields:

- id - User's unique identifier as primary key and auto increment;
- nome - (mandatory)
- email - (mandatory and unique)
- senha - (mandatory)

b) `pokemons` table with the fields:

- id - unique pokemon identifier as primary key and auto increment;
- usuario_id - (mandatory)
- nome - (mandatory)
- habilidades - (mandatory)
- image
- nickname

2 - For the `users` entity, the following functionalities must be implemented.

a) User registration

- The user's password must be encrypted using the `bcrypt` library before saving the record.

b) User login

- Validate user credentials using the `bcrypt` library.
- Generate the authentication token with the `jsonwebtoken` library.

3 - For the `pokemons` entity, the following functionalities must be implemented.

a) Pokemon registration

b) Pokemon nickname update only

c) Complete list of pokemons

d) Listing of only one pokemon filtered by its id

e) Exclusion of pokemon

It is mandatory for the features of the `pokemons` entity:

- Receive the request header token (_authorization_) in `Bearer Token` format and validate the logged in user on all endpoints.
- The `user_id` field must not be captured from the request body. It must be obtained from the token received in the header.
- In the pokemon register, the `skills` field should only receive a string of skills separated by commas.

_Obs.: It is necessary to carry out all the necessary validations to avoid errors in the database_

Body example for pokemon registration:

```
{
    "name": "Pikachu",
    "nickName": "pikachu",
    "skills": "static, lightning-rod",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
}
```

Return example in pokemon listing:

```
[
    {
        "id": 1,
        "user": "Responsible user name"
        "name": "Pikachu",
        "nickName": "pikachu",
        "skills": ["static", "lightning-rod"],
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
    },
    {
        "id": 2,
        "user": "Responsible user name"
        "name": "Bulbasaur",
        "nickName": "bulbasaur",
        "skills": ["overgrow", "chlorophyll"],
        "imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
    }
]
```

---



###### tags: `challenges` `node` `database` `sql` `postgres`
