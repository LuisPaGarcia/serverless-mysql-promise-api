const dotenv = require('dotenv').config()
const mysql = require('promise-mysql');

const success = (body) => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify(body)
  };
};

module.exports.helloWorld = (event, context, callback) => {
  callback(null, success({ message: "Hello World!" }));
};

module.exports.getDepartamentos = (event, context, callback) => {

  var connection;

  mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  }).then(function (conn) {
    connection = conn;
    return connection.query('select * from Departamentos');
  }).then(function (rows) {
    // Query the items for a ring that Frodo owns.
    //var result = connection.query('select * from items where `owner`="' + rows[0].id + '" and `name`="ring"');
    connection.end();
    return rows;
  }).then(function (rows) {
    // Logs out a ring that Frodo owns
    callback(null, success({ values: rows }))
  }).catch((err) => {
    console.log(err);
  });

};
