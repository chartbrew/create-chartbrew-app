const prompts = require("prompts");

module.exports = () => {
  const questions = [{
    type: "text",
    name: "dbname",
    message: "What's the name of your database? (default: 'chartbrew')",
  }, {
    type: "text",
    name: "dbusername",
    message: "What's the database username?",
  }, {
    type: "text",
    name: "dbpassword",
    message: "What's the user password? (defaults to blank)",
  }, {
    type: "text",
    name: "dbhost",
    message: "What's your database host address? (default: 'http://localhost')",
  }, {
    type: "text",
    name: "dbport",
    message: "On which port is your database running? (default: '3306')",
  }, {
    type: "text",
    name: "cbsecret",
    message: "Add a secret string to secure your user sessions and encrypt the data:",
  }];

  return prompts(questions);
}
