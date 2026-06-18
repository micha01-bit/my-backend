const fs = require("node:fs");
const path = require("node:path");


const getUsers = () => {
  const pathFile = path.join(__dirname, "../data/users.json");
  return fs.readFileSync(pathFile);
};


module.exports = getUsers;