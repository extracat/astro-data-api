//
// This is MongoDB adapter. It provides the specific MongoDB functionality to the abstract common interface.
//

const { ObjectId } = require('mongodb');
const { MongoClient } = require('mongodb');
const Database = require('./db');
const uri = process.env.MONGODB_URI;


/////////////// Tools ////////////////

// Making valid id for database query
function validId (id) {
  if (ObjectId.isValid(id)) {
    return new ObjectId(id);
  } else {
    return ( id == 0 ? 0 : parseInt(id, 10) || id ); 
  }
}

// Making "_id" query string valid and any other actions
function preprocessQuery(query) {
  if (query._id && typeof query._id === 'string') {
    query._id = validId(query._id);
  }
  // any other actions

  return query;
}


/////////////// Adapter ////////////////

class MongoDBAdapter extends Database {

  constructor() {
    super();
    this.connectionString = uri;
  }

  async connect() {

    // Create new connection only if no one exists
    if (!this.client) { 
      this.client = new MongoClient(this.connectionString);
      await this.client.connect();
      if (process.env.NODE_ENV !== 'production') {
        console.log('MongoDBAdapter: Connected to database');
      }
    }
  }

  async close() {
    this.client = new MongoClient(this.connectionString);
    await this.client.close();
  }

  async find(collection, query) {
    query = preprocessQuery(query);
    return await this.client.db().collection(collection).find(query).sort({ _id: -1 }).toArray();
  }

  async findOne(collection, query) {
    query = preprocessQuery(query);
    return await this.client.db().collection(collection).findOne(query);
  }

  async insert(collection, data) {
    return await this.client.db().collection(collection).insertOne(data);
  }

  async update(collection, query, data) {
    query = preprocessQuery(query);
    return await this.client.db().collection(collection).updateOne(query, { $set: data });
  }

  async delete(collection, query) {
    query = preprocessQuery(query);
    return await this.client.db().collection(collection).deleteOne(query);
  }
}

module.exports = MongoDBAdapter;
