# Create ChartBrew App

A CLI tool for [📈 Chartbrew ☕](https://github.com/razvanilin/chartbrew)

## 🚀 Get started

```
npx create-chartbrew-app myApp
```

## 👨‍💻 Arguments

Run the command below and complete fill in the details as you are prompted. You will need to have MySQL running and prepare an empty database that Chartbrew can use.

```sh
npx create-chartbrew-app chartbrew
```

The CLI tool creates a `chartbrew/.env` file which you can configure at any time if you want to change the database, API & client host, etc. The file contains comments explaining what each environmental variable is for.

## 📦 Update an existing project

Navigate to the root of your ChartBrew project and run:

```sh
npx create-chartbrew-app update
```

This will create a local repository from your application if it's not created already, commit any changes, fetch the new update from `upstream` and merge with your project.

**Note:** This might result into multiple conflicts that you have to fix yourself. If you run into any issues you can always rollback to the previous commit that you or the tool made for you automatically.

## 📚 Read the docs

[Check the documentation for extra information.](https://docs.chartbrew.com)
