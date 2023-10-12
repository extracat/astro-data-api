export class Telegram {
  constructor(data) {
      this._id = data._id;
      this.user_id = data.user_id;
      this.timestamp = data.timestamp;
      this.index = data.index;
      this.title = data.title;
      this.body = data.body;
      this.coordinates = {
          ra: new Coordinate(data.coordinates.ra),
          dec: new Coordinate(data.coordinates.dec)
      };
      this.event_datetime = data.event_datetime;
      this.magnitude = data.magnitude;
      this.limiting_magnitude = data.limiting_magnitude;
      this.filter = data.filter;
      this.reporters = data.reporters.map(reporter => new Reporter(reporter));
      this.observatories = data.observatories.map(observatory => new Observatory(observatory));
      this.categories = data.categories;
      this.references = data.references;
  }
}

export class Observatory {
  constructor(data) {
      this.name = data.name;
      this.instrument = data.instrument;
      this.observation_mode = data.observation_mode;
  }
}


export class Reporter {
  constructor(data) {
      this.organization = data.organization;
      this.authors = data.authors.map(author => new Author(author));
  }
}


export class Author {
  constructor(data) {
      this.name = data.name;
      this.email = data.email;
  }
}


export class Coordinate {
  constructor(data) {
      this.value = data.value;
      this.error = data.error;
      this.error_units = data.error_units;
  }
}
