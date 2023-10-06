const { ObjectId } = require('mongodb');
const MongoDBAdapter = require('../db/mongoDBAdapter');
const uri = process.env.MONGODB_URI

// Just to make pause
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//////////////////

module.exports.find = async function () { 
  try {
    const db = new MongoDBAdapter(uri);
    console.log("start");
    await db.connect();
    console.log("connected");
    return await db.find('telegrams', {});
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.findOne = async function (id) { 
  try {
    const db = new MongoDBAdapter(uri);
    await db.connect();

    let filter = {};
    if (ObjectId.isValid(id)) {
      filter._id = new ObjectId(id);
    } else {
      filter._id = ( id == 0 ? 0 : parseInt(id, 10) || id ); 
    }
    return await db.findOne('telegrams', filter);
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};
