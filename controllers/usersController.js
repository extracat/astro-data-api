//
// This file is a layer between the abstract database classes and routes handlers.
//

const db = new (require('../db/mongoDBAdapter'))();

// Common functions

//////////////////////////////////////////

module.exports.find = async function () { 
  try {
    await db.connect();
    return await db.find('users', {});
    
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 

};

module.exports.findOne = async function (id) { 
  try {
    await db.connect();
    return await db.findOne( 'users', {_id: id} );
  
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 
};

module.exports.insert = async function (data) { 
  try {
    await db.connect();

    let finalData = {};
    finalData.timestamp = new Date().toISOString();
    finalData = {...finalData, ...data};

    return await db.insert('users', finalData);
    
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 
};

module.exports.delete = async function (id) { 
  try {
    await db.connect();
    return await db.delete( 'users', getQuery(id) );
  
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 
};

module.exports.update = async function (id, data) { 
  try {
    await db.connect();

    return await db.update( 'users', getQuery(id), data );
  
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 
};


