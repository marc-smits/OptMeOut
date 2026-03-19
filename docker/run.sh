#!/bin/sh

# Execute in docker folder
cd "$(dirname "$0")"

docker compose -p optmeout up --force-recreate --wait -d
