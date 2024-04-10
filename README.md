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
  "_id": "ObjectId",
  "adn_id": "ADN231231A",
  "timestamp": "2023-11-05T13:15:30Z",
  "user_id": "ObjectId",
  "external_id": "GCN #num | AT #num | ATel #num ...",
  "title": "Title of telegram",
  "body": "The main content (markdown)",
  "event_datetime": "1994-11-05T13:15:30Z",
  "band": "radio | ir | optical | uv | x-ray | gamma",
  "coordinates": {
    "ra": {
      "value": "15:05:40.60",
      "error": 0.5,
      "error_units": "arcsec"
    },
    "dec": {
      "value": "-54:54:24.2",
      "error": 0.5,
      "error_units": "arcsec"
    }
  },
  "light_curve": [
    {
      "datetime": "2023-01-01T00:00:00",
      "magnitude": 5.0,
      "upper_limit": 5.0,
      "exptime": 180,
      "filter": "blank | red | UV | H-a | O-III | S-II ..."
    }
  ],
  "authors": [
    {
      "name": "John Doe",
      "email": "astronomer@space.com",
      "org": "Some Institution"
    }
  ],
  "observatories": [
    {
      "name": "Some Observatory",
      "instrument": "Wide Area Telescope",
      "observation_mode": "Visible Light"
    }
  ],
  "categories": [
    "MASTER-Net",
    "Gamma Burst",
    "X-ray",
    "Some other tag"
  ],
  "references": [
    "ADN221231",
    "ADN211020",
    "ADN200222"
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