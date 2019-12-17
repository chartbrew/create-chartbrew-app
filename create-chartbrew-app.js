const commander = require('commander');
const fs = require("fs");
const chalk = require("chalk");
const prompts = require("prompts");

const packageJson = require('./package.json');
const createDirectory = require("./utils/createProjectFolder");
const fetchProject = require("./utils/fetchProject");
const setupProject = require("./utils/setupProject");
const changeSettings = require("./utils/changeSettings");
const endInfo = require("./utils/endInfo");
const checkForUpdates = require("./utils/checkForUpdates");
const updateProject = require("./utils/updateProject");
const runMigrations = require("./utils/runMigrations");

const program = new commander.Command(packageJson.name);

let projectName;

program
  .version(packageJson.version)
  .arguments('<directory>')
  .option('--dbhost <dbhost>', 'Database host')
  .option('--dbport <dbport>', 'Database port')
  .option('--dbname <dbname>', 'Database name')
  .option('--dbusername <dbusername>', 'Database username')
  .option('--dbpassword <dbpassword>', 'Database password')
  .description('create or update a ChartBrew application')
  .action(directory => {
    projectName = directory;
  })
  .on('--help', () => {
    console.log(" ");
    console.log("You can also update an existing app. Navigate to the root directory and run: ");
    console.log(" ");
    console.log("  $ create-chartbrew-app update");
  })
  .parse(process.argv);

if (projectName === undefined) {
  console.error('Please specify the <directory> of your project');
  process.exit(1);
}

// check for a new version
checkForUpdates()
  .then((response) => {
    if (!response.isNew) {
      if (projectName === "update") return update();
      return installation();
    }

    const questions =
      {
          type:'toggle',
          name: 'proceed',
          message: "There is a new update for create-chartbrew-app. It's strongly recommended that you update before continuing. Do you want to proceed without updating?",
          active: 'yes',
          inactive: 'no'
      };

    return prompts(questions, { onCancel: () => {}, onSubmit: () => {}});
  })
  .then((answer) => {
    if (!answer) return;
    if (!answer.proceed) {
      console.log(chalk.green.bold("Run 'npm install -g create-chartbrew-app' to update the cli tool."));
      process.exit(0);
    }

    projectName === "update" ? update() : installation();
  })
  .catch((error) => {
    // error
    projectName === "update" ? update() : installation();
  });


function update() {
  updateProject();
}

function installation() {
  // check if the directory exists and if it's empty
  fs.readdir(projectName, (err, files) => {
    if (files && files.length && files.length > 0) {
      console.error("The project folder exists and it's not empty. The app can only be created in an empty folder.");
      process.exit(1);
    }

    createDirectory(projectName);
    fetchProject(projectName)
      .then(() => {
        changeSettings(projectName, program);

        setTimeout(() => {
          setupProject(projectName);
          runMigrations(projectName);
          endInfo(program, projectName);
        }, 2000)
      })
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  });
}

// generateNewApp(projectName, program);
