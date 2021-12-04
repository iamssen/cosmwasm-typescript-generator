# WORKSPACE TEMPLATE

## Start web project

```sh
# create a workspace directory
npx copy-github-directory workspace my-project
cd my-project

# create an app
npx copy-github-directory web my-app

# add "my-app" to workspaces of package.json

# install
yarn

# start
cd my-app

# start
yarn run start
```

## Start electron project

```sh
# create a workspace directory
npx copy-github-directory workspace my-project
cd my-project

# create an app
npx copy-github-directory electron my-app

# add "my-app" to workspaces of package.json

# install
yarn

# directory
cd my-app

# start
yarn run start
```

## Start multi-packages project

```sh
# create a workspace directory
npx copy-github-directory workspace my-project
cd my-project

# create an app
npx copy-github-directory packages my-packages

# add "my-packages" to workspaces of package.json

# install
yarn

# start
cd my-packages

# start
yarn run test
```
