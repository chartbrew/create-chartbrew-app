const fs = require("fs");
const requestP = require("request-promise");
const request = require("request");
const ncp = require("ncp").ncp;
const { exec } = require('child_process');
const Seven = require("node-7z");
const sevenBin = require("7zip-bin");

const getLatestRelease = require("./getLatestRelease");

const pathTo7zip = sevenBin.path7za;

module.exports = (projectName) => {
  return getLatestRelease()
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

      return new Promise((resolve) => {
        request(downloadOpt)
          .pipe(
            fs.createWriteStream(zipFile)
          )
          .on("finish", () => {
            const extractStream = Seven.extractFull(`${projectName}/chartbrew.zip`, projectName, {
              $progress: true,
              $bin: pathTo7zip,
            });

            extractStream.on("end", () => {
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
