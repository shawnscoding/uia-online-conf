console.log("process.env.REACT_APP_CONFIG :: ", process.env.REACT_APP_CONFIG);
const config = require("./" + process.env.REACT_APP_CONFIG);
// const fs = require('fs');

console.log("config -- shawn", config);
// let rawdata = fs.readFileSync(process.env.REACT_APP_APP_CONFIG, 'utf8');
// let config = JSON.parse(rawdata);
// console.log(config);

module.exports = config;
