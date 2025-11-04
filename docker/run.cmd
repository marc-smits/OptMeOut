@echo off

REM Execute in docker folder
cd %~dp0

docker compose -p optmeout up --force-recreate --wait -d
