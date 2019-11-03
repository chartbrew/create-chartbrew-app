const chalk = require("chalk");

module.exports = (program) => {
  console.log(" ");
  console.log(chalk.green.bold("All Done!"));
  console.log(" ");
  if (program.dbname && program.dbname.length > 0) {
    console.log(chalk.bold(`Don't forget to create a database named '${program.dbname}' before starting.`));
  }
  console.log(" ");

  console.log(chalk.blue.bold("Next steps:"));
  console.log(" ");
  console.log(`${chalk.blue("Run the client app: ")} cd client && npm run start`);
  console.log(`${chalk.blue("Run the server app: ")} cd server && npm run start-dev`);
  console.log(" ");

  console.log(chalk.bold("For more info please visit https://docs.chartbrew.com"));
  console.log(" ");

  console.log(chalk.green.bold("Thank you for using ChartBrew!"));
  console.log(chalk.green.bold("Join our slack channel to get help or chat with other people using the software: https://bit.ly/34pfoeN"));
  console.log(" ");
};
