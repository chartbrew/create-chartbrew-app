const fs = require("fs");
const requestP = require("request-promise");
const request = require("request");
const unzip = require("unzipper");
const ncp = require("ncp").ncp;
const { exec } = require('child_process');

module.exports = (projectName) => {
  const releaseOpt = {
    url: "https://api.github.com/repos/razvanilin/chartbrew/releases/latest",
    method: "GET",
    headers: {
      "Accept": "application/json",
      "User-Agent": "create-chartbrew-app",
    },
  };

  return requestP(releaseOpt)
    .then((response) => {
      const jsonResp = JSON.parse(response);
      const zipFile = `${projectName}/chartbrew.zip`;

      const downloadOpt = {
        url: jsonResp.zipball_url,
        method: "GET",
        headers: {
          "Accept": "application/json",
          "User-Agent": "create-chartbrew-app",
        },
      };

      return new Promise((resolve, reject) => {
        request(downloadOpt)
          .pipe(
            fs.createWriteStream(zipFile)
          )
          .on("finish", () => {
            fs.createReadStream(zipFile)
              .pipe(unzip.Extract({ path: projectName }))
              .on("finish", () => {
                fs.unlinkSync(`${projectName}/chartbrew.zip`);
                const files = fs.readdirSync(projectName);
                ncp(`${projectName}/${files[0]}`, projectName, (err) => {
                  if (err) {
                    console.error(err);
                    process.exit(1);
                  }
                  exec(`rm -rf ${projectName}/${files[0]}`, () => {});
                  resolve();
                });
              });
          });
      });
    });
};
