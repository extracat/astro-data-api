const { MongoClient } = require('mongodb');
const Database = require('./db');

class MongoDBAdapter extends Database {
  constructor(connectionString) {
    super();
    this.connectionString = connectionString;
  }

  async connect() {
    this.client = new MongoClient(this.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    await this.client.connect();
    console.log('Connected to MongoDB');
  }

  async find(collection, query) {
    return await this.client.db().collection(collection).find(query).toArray();
  }

  async findOne(collection, query) {
    return await this.client.db().collection(collection).findOne(query);
  }

  async insert(collection, data) {
    await this.client.db().collection(collection).insertOne(data);
  }

  async update(collection, query, data) {
    await this.client.db().collection(collection).updateOne(query, { $set: data });
  }

  async delete(collection, query) {
    await this.client.db().collection(collection).deleteOne(query);
  }
}

module.exports = MongoDBAdapter;
