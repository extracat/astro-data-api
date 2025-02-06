const { ObjectId } = require('mongodb');

class MockObject {
  constructor(name = "Object name") {
    this._id = new ObjectId();
    this.name = name;
  }
}

///////////////////////////////////

module.exports.find = async function () { 
  try {

    const object1 = new MockObject();
    const object2 = new MockObject();
    const object3 = new MockObject();
    
    return await [object1, object2, object3];
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 
};

module.exports.findOne = async function (query) { 
  try {
    const object = new MockObject();
    object._id = query;
    return await object;
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 
};

module.exports.insert = async function (data) { 
  try {
    const object = new MockObject(data.name);
    const result = {
        acknowledged: true,
        insertedId: object._id
    };
    return await result;
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 
};

module.exports.delete = async function (query) { 
  try {
    const result = {
      acknowledged: true,
      deletedCount: 1
    };
    return await result;  
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 
};

module.exports.update = async function (query, data) { 
  try {
    const object = new MockObject(data.name);
    object._id = query;
    const result = {
      acknowledged: true,
      modifiedCount: 1,
      upsertedId: null,
      upsertedCount: 0,
      matchedCount: 1
    };
    return await result;  
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 
};


