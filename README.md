# Create ChartBrew App

A CLI tool for [📈 ChartBrew ☕](https://github.com/razvanilin/chartbrew)

## 🚀 Get started

```
npx create-chartbrew-app myApp
```

## 👨‍💻 Arguments

The CLI tool can create a `.env` file for you to get started right away. Just pass any of of the options below.

```sh
npx create-chartbrew-app cbTest1 --dbname="chartbrewy" --dbhost="localhost" --dbport="3306" --dbusername="raz" --dbpassword="secretStuff"
```

There are two `.env` files that need to be set with the database authentication parameters. If you haven't used the parameters above when you ran the command, create those files manually by following the templates found at:

* `server/.env-template`
* `server/models/.env_template`

## 📦 Update an existing project

Navigate to the root of your ChartBrew project and run:

```sh
npx create-chartbrew-app update
```

This will create a local repository from your application if it's not created already, commit any changes, fetch the new update from `upstream` and merge with your project.

**Note:** This might result into multiple conflicts that you have to fix yourself. If you run into any issues you can always rollback to the previous commit that you or the tool made for you automatically.

## 📚 Read the docs

[Check the documentation for extra information.](https://docs.chartbrew.com)
