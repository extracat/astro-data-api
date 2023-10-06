const { ObjectId } = require('mongodb');
const databaseAdapter = require('../db/mongoDBAdapter');

const uri = process.env.MONGODB_URI;
const db = new databaseAdapter(uri);

// Just to make pause
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//////////////////

module.exports.find = async function () { 
  try {
    await db.connect();
    return await db.find('telegrams', {});
    
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } finally {
    //await db.close();
  } 

};

module.exports.findOne = async function (id) { 
  try {
    await db.connect();
    let filter = {};
    if (ObjectId.isValid(id)) {
      filter._id = new ObjectId(id);
    } else {
      filter._id = ( id == 0 ? 0 : parseInt(id, 10) || id ); 
    }
    return await db.findOne('telegrams', filter);
    
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } finally {
    //await db.close();
  } 
};
