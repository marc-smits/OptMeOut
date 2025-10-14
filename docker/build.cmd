@echo off

docker compose -p optmeout up --force-recreate --wait -d generate install build
