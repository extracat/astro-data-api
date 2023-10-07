const db = new (require('../db/mongoDBAdapter'))();

// Tool: just to make pause somewhere
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//////////////////////////////////////////

module.exports.find = async function () { 
  try {
    await db.connect();
    return await db.find('telegrams', {});
    
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 

};

module.exports.findOne = async function (id) { 
  try {
    await db.connect();
    return await db.findOne('telegrams', { _id: id } );
  
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 
};

module.exports.insert = async function (data) { 
  try {
    await db.connect();

    const finalData = data;
    finalData.timestamp = new Date().toISOString();

    return await db.insert('telegrams', finalData);
    
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 
};

module.exports.delete = async function (id) { 
  try {
    await db.connect();
    return await db.delete('telegrams', { _id: id } );
  
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 
};

module.exports.update = async function (id, data) { 
  try {
    await db.connect();

    return await db.update('telegrams', { _id: id }, data);
  
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 
};


