# Astro Data API 

Astro Data API — an open API server for publishing observations of astronomical events, data exchange and automation of telescopes. Event publications (telegrams) support markdown with gfm and latex included.

## Technology stack

### Core
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com)
- [MongoDB Driver](https://mongodb.github.io/node-mongodb-native/)

### Authentication and authorization
- [JWT](https://jwt.io)
- [Passport](https://www.passportjs.org)

### Validation
- [express-validator](https://express-validator.github.io/docs)


## Installation

First of all make sure you have **Node.js** installed. Then clone the repo:

``` sh
git clone https://github.com/extracat/astro-data-api.git

cd astro-data-api
```

Next you need to create `.env.local` file with environment variables `MONGODB_URI` and `JWT_SECRET`. Now you are ready to build and run:

``` sh
yarn

yarn dev
```

You've run local API server. 


## JSON Data Structures

### Telegram

``` json
{
  "_id": "string",
  "adn_id": "string",
  "user_id": "66127676f5c1f51ce9ffe440",
  "timestamp": "2024-06-05T14:31:19.417Z",

  "event_datetime": "2024-06-05T14:31:19.417Z",
  "title": "Lorem Ipsum dolor sit amet",
  "authors": "John Doe, Jane Doe (NASA)",
  "authors_list": [
    {
      "_id": "66127676f5c1f51ce9ffe440",
      "name": "John Doe",
      "email": "john.doe@nasa.gov",
      "org": "NASA"
    },
    {
      "_id": "66127676f5c1f51ce9ffe440",
      "name": "Jane Doe",
      "email": "jane.doe@nasa.gov",
      "org": "NASA"
    }
  ],
  "body": "At ipsum vitae est lacinia tincidunt. Maecenas elit orci,gravida ut, molestie non, venenatis vel, lorem. Sedlacinia. Suspendisse potenti. Sed ultricies cursuslectus. In id magna sit amet nibh suspicit euismod.Integer enim. Donec sapien ante, accumsan ut,sodales commodo, auctor quis, lacus. Maecenas a elitlacinia urna posuere sodales. Curabitur pede pede,molestie id, blandit vitae, varius ac, purus. Mauris atipsum vitae est lacinia tincidunt. Maecenas elit orci, gravida ut, molestie non, venenatis vel,lorem. Sed lacinia. Suspendisse potenti. Sed ultrucies cursus lectus.",
  "light_curve": [
    {
      "coordinates": {
        "right_ascension": 10.6845833,
        "declination": 41.2691667,
        "error": 3.167
      },
      "datetime": "2024-06-05T14:31:19.417Z",
      "magnitude": 3.44,
      "upper_limit": 17.9,
      "exptime": 60,
      "instrument": {
        "_id": "66127676f8c9f51ce9ffe042",
        "name": "MASTER-SAAO",
        "instrument": "Robotic telescope",
        "observation_mode": "Optical",
        "observatory": {
          "_id": "66127676f7c9f51ce9ffe540",
          "name": "South African Astronomical Observatory",
          "org": "National Research Foundation",
          "country": "South Africa"
        }
      },
      "filter": "C"
    }
  ],
  "upper_limits": [
    {
      "framae": [
        {
          "right_ascension": 10,
          "declination": 40
        },
        {
          "right_ascension": 11,
          "declination": 41
        },
        {
          "right_ascension": 10,
          "declination": 42
        }
      ],
      "datetime": "2024-06-05T14:31:19.417Z",
      "upper_limit": 17.6,
      "exptime": 60,
      "instrument": {
        "_id": "66127676f8c9f51ce9ffe042",
        "name": "MASTER-SAAO",
        "instrument": "Robotic telescope",
        "observation_mode": "Optical",
        "observatory": {
          "_id": "66127676f7c9f51ce9ffe540",
          "name": "South African Astronomical Observatory",
          "org": "National Research Foundation",
          "country": "South Africa"
        }
      },
      "filter": "C"
    }
  ],
  "band": "Optical",
  "categories": [
    {
      "_id": "66127676f8c9f11ce0ffe042",
      "text": "galaxy",
      "color": "blue"
    }
  ],
  "references": [
    "ADN220903",
    "10.1109/5.771073",
    "GCN 36060"
  ]
}
```

### User

``` json
{
  "_id": "ObjectId",
  "timestamp": "2023-11-21T14:52:24.871Z",
  "email": "user@test.com",
  "phone_number": "+17775553311",
  "password": "(bcrypt encrypted hash)",
  "first_name": "John",
  "middle_name": "Alexander",
  "last_name": "Smith",
  "prefix": "Dr.",
  "suffix": "Jr.",
  "display_name": "Johnny Astronomer",
  "date_of_birth":"1961-04-12",
  "user_role": "viewer | editor | admin",
  "account_status": "active | suspended | closed",
  "last_login_date": "2023-11-21T14:52:24.871Z",
  "locale": "en_US",
  "time_zone": "UTC-7",
}
```