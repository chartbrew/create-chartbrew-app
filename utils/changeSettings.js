const fs = require("fs");
const readline = require("readline");
const availableArgs = require("../config").args;

module.exports = async (projectName, answers) => {
  console.log(" ");
  console.log("Preparing the settings files...")
  console.log(" ");

  async function changeSettings(templatePath, envPath) {
    const fileStream = fs.createReadStream(templatePath);
    const newFileStream = fs.createWriteStream(envPath);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
      // Note: we use the crlfDelay option to recognize all instances of CR LF
      // ('\r\n') in input.txt as a single line break.
      
    for await (const line of rl) {
      const firstEqualIndex = line.indexOf("=");
      const parameter = line.substring(0, firstEqualIndex);

      let replaced = false;
      Object.keys(availableArgs).forEach((arg) => {
        if (availableArgs[arg].indexOf(parameter) > -1 && parameter.length > 0) {
          newFileStream.write(`${parameter}=${answers[arg]} \n`);
          replaced = true;
        }
      });

      if (!replaced) {
        newFileStream.write(`${line} \n`);
      }
    }
  }

  changeSettings(`${projectName}/.env-template`, `${projectName}/.env`);
};
