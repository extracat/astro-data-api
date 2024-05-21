const { ObjectId } = require('mongodb');

const object = {
  _id: new ObjectId(),
  name: "Object name"
}


///////////////////////////////////

module.exports.find = async function () { 
  try {

    const object1 = object;
    const object2 = object;
    
    return await [object1, object2];
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 
};

module.exports.findOne = async function (query) { 
  try {
    object._id = query;
    return await object;
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 
};

module.exports.insert = async function (data) { 
  try {
    const result = { ...object, ...data };
    return await result;
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 
};

module.exports.delete = async function (query) { 
  try {
    return await object;
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 
};

module.exports.update = async function (query, data) { 
  try {
    object._id = query;
    const result = { ...object, ...data };
    return await result;  
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 
};


