const { spawnSync } = require('child_process');

module.exports = (projectName) => {
  console.log(" ");
  console.log("Running the migrations...");
  console.log(" ");
  
  if (projectName) {
    spawnSync(`cd ${projectName}/server && npm run`, ["db:migrate"], { shell: true, stdio: 'inherit' });
  } else {
    spawnSync(`cd server && npm run`, ["db:migrate"], { shell: true, stdio: 'inherit' });
  }
};