const MongoDBAdapter = require('../db/mongoDBAdapter');
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid environment variable: "MONGODB_URI"')
}
const uri = process.env.MONGODB_URI


exports.find = async function find() {
  const db = new MongoDBAdapter(uri);
  await db.connect();
  const telegrams = await db.find('telegrams', {});
  console.log(telegrams);
};
