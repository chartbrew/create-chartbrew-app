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
const showPrompts = require('./utils/showPrompts');

const program = new commander.Command(packageJson.name);

let projectName;

program
  .version(packageJson.version)
  .arguments('<directory>')
  .description('create or update a Chartbrew application')
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
      return setTheVars();
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

    projectName === "update" ? update() : setTheVars();
  })
  .catch((error) => {
    // error
    projectName === "update" ? update() : setTheVars();
  });


function update() {
  updateProject();
}

function setTheVars() {
  console.log(chalk.yellow.bold("Please make sure you have a MySQL or PostgreSQL instance running and you have an empty database that Chartbrew can use before proceeding."))
  console.log(" ");
  showPrompts()
    .then((answers) => {
      installation(answers);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

function installation(answers) {
  // check if the directory exists and if it's empty
  fs.readdir(projectName, (err, files) => {
    if (files && files.length && files.length > 0) {
      console.error("The project folder exists and it's not empty. The app can only be created in an empty folder.");
      process.exit(1);
    }

    createDirectory(projectName);
    fetchProject(projectName)
      .then(() => {
        changeSettings(projectName, answers);

        setTimeout(() => {
          setupProject(projectName);
          runMigrations(projectName);
          endInfo(answers, projectName);
        }, 2000)
      })
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  });
}

// generateNewApp(projectName, program);
