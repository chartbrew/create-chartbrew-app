const requestP = require("request-promise");

const appVersion = require('../package.json').version;

module.exports = () => {
  const getOpt = {
    url: "https://api.github.com/repos/razvanilin/create-chartbrew-app/releases/latest",
    method: "GET",
    headers: {
      "Accept": "application/json",
      "User-Agent": "create-chartbrew-app",
    },
  };

  return requestP(getOpt)
    .then((response) => {
      const release = JSON.parse(response);
      if (appVersion !== release.tag_name.replace("v", "")) {
        return Promise.resolve({ isNew: true });
      }

      return Promise.resolve({ isNew: false });
    })
    .catch((error) => {
      // error
      return Promise.resolve({ isNew: false });
    });
};
