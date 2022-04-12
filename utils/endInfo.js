const chalk = require("chalk");

module.exports = (program, projectName) => {
  console.log(" ");
  console.log(chalk.green.bold("All Done!"));
  console.log(" ");
  if (program.dbname && program.dbname.length > 0) {
    console.log(chalk.bold(`If there are any database errors, make sure you have a database named '${program.dbname}'`));
    console.log(chalk.bold(`Also, make sure the env variables in ${chalk.blue.bold(projectName + "/.env")} are set, then run: `));
    console.log(" ");
    console.log("https://docs.chartbrew.com/#environmental-variables")
  }
  console.log(" ");

  console.log(chalk.green.bold("Start Chartbrew:"));
  console.log(" ");
  console.log(chalk.bold("To run in development, open two terminals and run: "));
  console.log(`Terminal 1: ${chalk.blue.bold("cd client && npm run start")}`);
  console.log(`Terminal 2: ${chalk.blue.bold("cd server && npm run start-dev")}`);
  console.log(" ");

  console.log(chalk.bold("Learn how to deploy your app in production:"));
  console.log("https://docs.chartbrew.com/deployment/");
  console.log(" ");

  console.log(chalk.green.bold("Thank you for using Chartbrew!"));
  console.log(" ");
  console.log(chalk.green.bold("Join our Discord server:"));
  console.log(" ");
  console.log(chalk.bold("https://discord.gg/KwGEbFk"));
  console.log(" ");
};
