const db = new (require('../db/mongoDBAdapter'))();

// Get current date YYMMDD
async function getID() {
  const now = new Date();
  const year = now.getUTCFullYear().toString().slice(-2);
  const month = (now.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = now.getUTCDate().toString().padStart(2, '0');
  const baseID = 'ADN' + year + month + day;

  await db.connect();

  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  console.log("Trying ID =", baseID); // <=== ////// DELETE ME ////////
  // Check base ID
  if (!(await db.findOne('telegrams', { adn_id: baseID }))) {
    return baseID;
  }

  // Check one-letter suffix
  for (let i = 0; i < alphabet.length; i++) {
    let currentID = baseID + alphabet[i];

    console.log("Trying ID =", currentID); // <=== ////// DELETE ME ////////
    if (!(await db.findOne('telegrams', { adn_id: currentID }))) {
      return currentID;
    }
  }

  // Check two-letter suffix
  for (let i = 0; i < alphabet.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      let doubleLetterID = baseID + alphabet[i] + alphabet[j];

      console.log("Trying ID =", doubleLetterID); // <=== ////// DELETE ME ////////
      if (!(await db.findOne('telegrams', { adn_id: doubleLetterID }))) {
        return doubleLetterID;
      }
    }
  }

  console.error("getID: Too many entries for this date!");
  throw new Error("getID: Too many entries for this date!");
}

// Get the right query according to ID type
function getQuery(id) {
  let query = {};

  // Check for string starting with "ADN" (case insensitive)
  if (id.toUpperCase().startsWith("ADN") && id.length < 24) {
    query.adn_id = id.toUpperCase();
  } 
  // Checking for length specific to ObjectId
  else if (id.length === 24) {
    query._id = id;  
  } 
  else {
    throw new Error("Invalid ID format");
  }
  return query;
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
    return await db.findOne( 'telegrams', getQuery(id) );
  
  } catch (error) {
    console.error("Controller Error: ", error);

    if (error == "Error: Invalid ID format") {
      return {
        "errors": [{
          "type": "field",
          "value": id,
          "msg": "Invalid ID format",
          "path": "id",
          "location": "params"
        }]
      };
    } else {
      throw error;
    }
    
  } 
};

module.exports.insert = async function (data) { 
  try {
    await db.connect();

    let finalData = {};

    try {
      const newID = await getID();
      console.log("Final ID =", newID);
      finalData.adn_id = newID;
    } catch (error) {
      console.error(error);
      throw error;
    } 

    finalData.timestamp = new Date().toISOString();

    finalData = {...finalData, ...data};

    console.log ("Now making request"); // <=== ////// DELETE ME ////////
    return await db.insert('telegrams', finalData);
    
  } catch (error) {
    console.error("Controller Error: ", error);
    throw error;
  } 
};

module.exports.delete = async function (id) { 
  try {
    await db.connect();
    return await db.delete( 'telegrams', getQuery(id) );
  
  } catch (error) {
    console.error("Controller Error: ", error);

    if (error == "Error: Invalid ID format") {
      return {
        "errors": [{
          "type": "field",
          "value": id,
          "msg": "Invalid ID format",
          "path": "id",
          "location": "params"
        }]
      };
    } else {
      throw error;
    }
  } 
};

module.exports.update = async function (id, data) { 
  try {
    await db.connect();

    return await db.update( 'telegrams', getQuery(id), data );
  
  } catch (error) {
    console.error("Controller Error: ", error);
    
    if (error == "Error: Invalid ID format") {
      return {
        "errors": [{
          "type": "field",
          "value": id,
          "msg": "Invalid ID format",
          "path": "id",
          "location": "params"
        }]
      };
    } else {
      throw error;
    }
  } 
};


