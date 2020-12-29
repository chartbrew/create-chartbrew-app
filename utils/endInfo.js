const chalk = require("chalk");

module.exports = (program, projectName) => {
  console.log(" ");
  console.log(chalk.green.bold("All Done!"));
  console.log(" ");
  if (program.dbname && program.dbname.length > 0) {
    console.log(chalk.bold(`If there are any database errors, make sure you have a database named '${program.dbname}'`));
    console.log(chalk.bold(`Also, make sure the env variables in ${chalk.blue.bold(projectName + "/.env")} are set, then run: `));
    console.log(" ");
    console.log(chalk.blue.bold(`cd ${projectName}/server && npm run db:migrate`));
  }
  console.log(" ");

  console.log(chalk.green.bold("Next steps:"));
  console.log(" ");
  console.log("To run in development: ");
  console.log(`Run the client app: ${chalk.blue.bold("cd client && npm run start")}`);
  console.log(`Run the server app: ${chalk.blue.bold("cd server && npm run start-dev")}`);
  console.log(" ");

  console.log("To deploy your app in production:");
  console.log(`${chalk.blue("Visit the documentation for instructions: ")} https://docs.chartbrew.com/deployment/`);
  console.log(" ");

  console.log(chalk.green.bold("Thank you for using Chartbrew!"));
  console.log(" ");
  console.log(chalk.green.bold("Join our Discord server:"));
  console.log(" ");
  console.log(chalk.bold("https://discord.gg/KwGEbFk"));
  console.log(" ");
};
