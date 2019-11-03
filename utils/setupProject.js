const { spawnSync } = require('child_process');

module.exports = (projectName) => {
  console.log("Setting up the project...");
  const npm = spawnSync(`cd ${projectName} && npm run`, ["setup"], { shell: true, stdio: 'inherit' });
};
