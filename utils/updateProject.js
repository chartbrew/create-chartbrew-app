const fs = require("fs");
const path = require("path");
const { spawnSync } = require('child_process');
const chalk = require("chalk");
const prompts = require("prompts");

const getLatestRelease = require("./getLatestRelease");

module.exports = () => {
  // check if the package.json exists in the current directory
  let packageJson;
  try {
    packageJson = JSON.parse(fs.readFileSync("package.json").toString("utf8"));
  } catch (e) {
    console.log(e);
    console.log("Make sure you run this command in your root ChartBrew project folder");
    process.exit(1);
  }

  let release;
  return getLatestRelease()
    .then((response) => {
      release = JSON.parse(response);
      if (release.tag_name.replace("v", "") === packageJson.version) {
        console.log("The project is already up to date");
        process.exit(0);
      }

      console.log(`You're currently using ${packageJson.version}`);
      console.log(`New version found - ${release.tag_name}`);
      console.log(" ");

      const questions =
        {
            type:'toggle',
            name: 'proceed',
            message: "The update process will merge the new changes with your current project. You might have to fix any conflicts manually. Do you want to proceed?",
            active: 'yes',
            inactive: 'no'
        };

      return prompts(questions, { onCancel: () => {}, onSubmit: () => {}});
    })
    .then((answer) => {
      if (!answer) process.exit(0);
      if (!answer.proceed) process.exit(0);

      console.log(`Updating the project to ${release.tag_name}...`);

      spawnSync("git", ["init"], { shell: true, stdio: 'inherit' });

      // add the upstream origin from where the update can be fetched
      spawnSync("git", ["remote", "add", "upstream", "git@github.com:chartbrew/chartbrew.git"], { shell: true, stdio: 'inherit' })

      // fetch the latest changes
      spawnSync("git", ["fetch", "upstream", release.tag_name, "--tags"], { shell: true, stdio: 'inherit' });

      // state and commit before merge
      spawnSync("git", ["add", "."], { shell: true, stdio: 'inherit' });
      spawnSync("git", ["commit", "-m", `merging with ${release.tag_name}`]);

      // merge changes
      spawnSync("git", ["merge", release.tag_name, "--allow-unrelated-histories"], { shell: true, stdio: 'inherit' });

      console.log(" ");
      console.log(chalk.blue("Update completed"));
      console.log("Make sure you fix all merge errors (if there are any) before running the project.");
      console.log("If you run into any issues, you can always roll-back to the previous commit.");
    })
    .catch((e) => {
      console.log("Could not fetch the latest release. Please try again");
      process.exit(1);
    });
}
