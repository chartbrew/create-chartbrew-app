const fs = require("fs");

module.exports = (projectName) => {
  if (!fs.existsSync(projectName)){
    fs.mkdirSync(projectName);
  }

  return;
};
