const prompts = require("prompts");

module.exports = () => {
  const questions = [{
    type: "select",
    name: "dialect",
    message: "What database do you use?",
    choices: [
      { title: "MySQL", value: "mysql", selected: true },
      { title: "PostgreSQL", value: "postgres" },
    ],
    hint: "- Arrow keys to select. Return to submit",
  }, {
    type: "text",
    name: "dbname",
    message: "What's the name of your database? (default: 'chartbrew')",
    initial: "chartbrew",
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
  }];

  return prompts(questions);
}
