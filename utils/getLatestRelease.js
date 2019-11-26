const request = require("request-promise");

module.exports = () => {
  const releaseOpt = {
    url: "https://api.github.com/repos/chartbrew/chartbrew/releases/latest",
    method: "GET",
    headers: {
      "Accept": "application/json",
      "User-Agent": "create-chartbrew-app",
    },
  };

  return request(releaseOpt);
}
