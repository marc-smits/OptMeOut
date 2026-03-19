#!/bin/sh

# Execute in docker folder
cd "$(dirname "$0")"

docker compose -p optmeout run --rm build
