/**
 * You can use this to quickly run queries where you don't have access to
 * the mongoDB shell (e.g, at university)
 */
require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGODB_URI } = process.env;

const client = new MongoClient(MONGODB_URI);

async function main() {
  try {
    await client.connect();
    const db = client.db();
    // update the query here
    //const results = await db.collection("tastings").find({}).limit(10);
    //console.log(results.toArray());
  } catch (error) {
    console.log(error);
  }
}
main();
