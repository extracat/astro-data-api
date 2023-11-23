# Astro Data API 

Astro Data API — an open API server for publishing observations of astronomical events, data exchange and automation of telescopes.

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
yarn f

yarn dev
```

You've run local API server. 


## Telegram Data JSON

``` js
{
  "_id": ObjectId,
  "adn_id": "ADN231231A", // Human readable ID
  "timestamp": "1994-11-05T13:15:30Z", // Post date (UTC)
  "user_id": ObjectId, // ID of a user, who made a post
  "external_id": "MASTER FROM J999999.99", // External ID
  "title": "...", // Title of telegram
  "body": "...", // The main content (markdown)
  "event_datetime": "1994-11-05T13:15:30Z", // Event date and time (UTC)
  "band": "visible", // radio | ir | visible | uv | x-ray | gamma
  "coordinates": {
    "ra": { 
      "value": "15:05:40.60",  // Right ascension 
      "error": 0.5,
      "error_units": "arcsec"
    },
    "dec": {
      "value": "-54:54:24.2",  // Declination
      "error": 0.5,
      "error_units": "arcsec"
    }
  },
  "light_curve": [
    {
      "datetime": "2023-01-01T00:00:00",	
      "magnitude": 5.0,  	
      "upper_limit": 5.0,	
      "exptime": 180,	// Exposition (seconds)
      "filter": "blank" // red | UV | H-a | O-III | S-II ...	
    },	
    {	
      "datetime": "2023-01-01T00:00:00",	
      "magnitude": 5.0,  	
      "upper_limit": 5.0,	
      "exptime": 180,	
      "filter": "blank"	
    }
  ],
  "authors": [
    {
      "name": "V. Lipunov",
      "email": "lipunov@sai.msu.ru",
      "org": "Lomonosov Moscow State University, SAI"
    },
    {
      "name": "O.A. Gress",
      "email": "grss@api.isu.ru", 
      "org": "Irkutsk State University, API"
    }
  ],
  "observatories": [
    {
      "name": "MASTER-Amur Robotic Telescope",
      "instrument": "Large Area Telescope",
      "observation_mode": "Visible Light"
    }
  ],
  "categories": [
    "MASTER-Net",
    "Gamma Burst",
    "X-ray"
  ],
  "references": [
    "ADN221231",
    "ADN211020",
    "ADN200222"
  ]
}

```
