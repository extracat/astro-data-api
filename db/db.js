class Database {
  async connect() {
    throw new Error('Method not implemented');
  }
  
  async close() {
    throw new Error('Method not implemented');
  }

  async find(collection, query) {
    throw new Error('Method not implemented');
  }

  async findOne(collection, query) {
    throw new Error('Method not implemented');
  }

  async insert(collection, data) {
    throw new Error('Method not implemented');
  }

  async update(collection, query, data) {
    throw new Error('Method not implemented');
  }

  async delete(collection, query) {
    throw new Error('Method not implemented');
  }
}

module.exports = Database;
