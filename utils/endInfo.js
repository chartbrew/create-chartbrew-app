const chalk = require("chalk");

module.exports = (program, projectName) => {
  console.log(" ");
  console.log(chalk.green.bold("All Done!"));
  console.log(" ");
  if (program.dbname && program.dbname.length > 0) {
    console.log(chalk.bold(`If there are any database errors, make sure you have a database named '${program.dbname}'`));
    console.log(chalk.bold(`Also, make sure the env variables in ${projectName}/.env are set, then run: `));
    console.log(" ");
    console.log(chalk.blue(`cd ${projectName}/server && npm run db:migrate`));
  }
  console.log(" ");

  console.log(chalk.green.bold("Next steps:"));
  console.log(" ");
  console.log("To run in development: ");
  console.log(`${chalk.blue("Run the client app: ")} cd client && npm run start`);
  console.log(`${chalk.blue("Run the server app: ")} cd server && npm run start-dev`);
  console.log(" ");

  console.log("To deploy your app in production:");
  console.log(`${chalk.blue("Visit the documentation for instructions: ")} https://docs.chartbrew.com/deployment/`);
  console.log(" ");

  console.log(chalk.green.bold("Thank you for using ChartBrew! Join our communities below to get help and chat with other brewers"));
  console.log(" ");
  console.log(chalk.green.bold("Join our slack channel:"));
  console.log(" ");
  console.log(chalk.bold("https://bit.ly/2PObdDR"));
  console.log(" ");
  console.log(chalk.green.bold("Or Discord:"));
  console.log(" ");
  console.log(chalk.bold("https://discord.gg/KwGEbFk"));
  console.log(" ");
};
