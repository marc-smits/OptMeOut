

echo make templates
../dockerRunBuildTemplates.sh 
cd dist
#npm stop dev
echo build npm modules
rm -rf node_modules 
npm install
cd ..
echo !!!!  restart server !!!
