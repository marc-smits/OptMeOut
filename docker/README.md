# Info
This folder contains the files to build the application, and run the application locally in Docker containers.

# Build application
Execute `docker/build` (either `build.sh` for Linux / `build.cmd` for Windows).

This will build the application with the following steps:
- **generate** -  Run the `build.py` that generate the locales in folder `dist`
- **install_fe** - Install the `node_modules` FE dependencies with npm
- **install_be** - Install the `vendor` BE dependencies with composer
- **build** - Build the FE for all locales and put in folder `dist_html`

# Run locally
Remember to copy the file `phpApi/api/.env.example` to `phpApi/api/.env` and check the configuration.

Execute `docker/run` (either `run.sh` for Linux / `run.cmd` for Windows).

This will perform the build, and then run the application locally in Docker containers.

Runs the following containers:
- **phpApi** - Runs the BE API on http://localhost:8080
- **react** - Runs the FE in development mode with live changes on http://localhost:5173
- **web** - Runs the static FE + BE API on http://localhost/

You can test that the API is installed by the following link http://localhost:8080/api/search.php

# GitHub Actions
The build step will be executed by GitHub Actions. There is configuration for the following targets:
- **local** - Not used by GitHub Actions, only for local development
- **development** - Pushing to `development` branch deploys to: https://dev.optmeout.me/
- **TODO: staging** - Pushing to `main` branch deploys to: https://staging.optmeout.me/
- **TODO: production** - Pushing to `live` branch deploys to: https://www.optmeout.me/

Wanneer je een andere branch ook naar development wilt builden kun je deze toevoegen aan `github\workflows\build_and_deploy.yml`, onder `on > push > branches`
