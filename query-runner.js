/**
 * You can use this to quickly run queries where you don't have access to
 * the mongoDB shell (e.g, at university)
 */
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGODB_URI, DATABASE } = process.env;
const client = new MongoClient(MONGODB_URI);
async function main() {
  try {
    await client.connect();
    const db = client.db(DATABASE);
    const collection = db.collection("tastings");
    // type in your query down here
    const results = await collection.find({}).limit(5).toArray();
    console.log("here are the results");
    console.log(results);
  } catch (error) {
    console.log(error);
  }
}
main();
