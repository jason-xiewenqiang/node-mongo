const mongo = require('mongo');
const MongoClient = mongo.MongoClient;
const dbLocation = 'mongodb://192.168.3.102:27017'; // 数据库地址 
const dbName = 'test'; // 文档名称
const collectName = 'demo'; // 集合名称
const ensureIndex = { id: 1 }; // 索引
const connect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbLocation, { useUnifiedTopology: true, useNewUrlParser: true }, (error, client) => {
      if (error) { reject(error); }
      else {
        client.db(dbName).collection(collectName).createIndex(ensureIndex);
        client.db(dbName).collection(collectName, (error, result) => {
          if (error) { reject(error); }
          else {
            resolve(client.db(dbName));
          }
        })
      }
    })
  })
}

const insertOne = async (collectName, item) => {
  const db = await connect();
  return new Promise((resolve, reject) => {
    db.collection(collectName).insertOne(item, (error, result) => {
      if (error) { reject(error); }
      else {
        resolve(true);
      }
    })
  })
}

const find = async (collectName, { whereObj = {}, limit = 0, skip = 0, sortObj = {} }) => {
  const db = await connect();
  return new Promise((resolve, reject) => {
    db.collection(collectName).find(whereObj).sort(sortObj).skip(skip).limit(limit).toArray((error, resilt) => {
      if (error) { reject(error); }
      else {
        resolve(result);
      }
    })
  })
}

module.exports = {
  connect,
  insertOne,
  find,
  collectName
}