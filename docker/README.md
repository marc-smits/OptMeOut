# Info
This folder contains the files to build the application, and run the application locally in Docker containers.

# Build application
Execute `docker/build` (either `build.sh` for Linux / `build.cmd` for Windows).

This will build the application with the following steps:
- **generate** -  Run the `build.py` that generate the locales in folder: `dist`
- **install** - Install the `node_modules` FE dependencies
- **build** - Build the FE for all locales and put in folder: `dist_html`

# Run locally
Execute `docker/run` (either `run.sh` for Linux / `run.cmd` for Windows).

This will perform the build, and then run the application locally in Docker containers.

Runs the following containers:
- **phpApi** - Runs the BE API on http://localhost:8080
- **react** - Runs the FE in development mode with live changes on http://localhost:5173
- **web** - Runs the static FE + BE API on http://localhost/en_GB

# GitHub Actions
The build step will be executed by GitHub Actions. There is configuration for the following targets:
- **local** - Not used by GitHub Actions, only for local development
- **development** - Pushing to `development` branch deploys to: https://dev.optmeout.me/en_GB
- **staging** - Pushing to `main` branch deploys to: https://staging.optmeout.me/en_GB
- **production** - Pushing to `release` branch deploys to: https://www.optmeout.me/en_GB
