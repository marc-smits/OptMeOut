
#####################################################################################
#
#  A script to deploy the files to a remote server
#
#
####################################################################################

echo "###########################################################################" 
echo
echo 
echo "This script will commit and deploy all changes to the live server"
echo
echo "###########################################################################" 
read -p "Press enter to continue"

# Read config variables 
#. scripts/deploy.config

DEPLOY_REPO_PATH="${PWD/}/deploy_opt_me_out"

###########################################################################
#
#   Functions
#
###########################################################################

build()
{
    ./scripts/build.sh
}

###########################################################################
#
# Install npm modules and build
#
###########################################################################
installModulesAndBuild()
{
    echo "##########"
    echo "Installing node modules .";
    rm -rf node_modules
    npm install

    echo "##########"
    echo "Building";
    rm -rf dist
    npm run build

    echo "##########"
    echo "Updating index file ";
    locale=${PWD##*/}
    #for Mac: sed -i '' "s/\/assets/\/$locale\/assets/g" dist/index.html
    sed -i  "s/\/assets/\/$locale\/assets/g" dist/index.html
}

###########################################################################
#
# Deploy
#
###########################################################################
deployFront()
{
    
    locale=${PWD##*/}
    echo $DEPLOY_REPO_PATH $locale
    ls $DEPLOY_REPO_PATH
    DEPLOY_FOLDER="$DEPLOY_REPO_PATH/$locale"
    echo $DEPLOY_FOLDER
    if [ ! -d "$DEPLOY_FOLDER" ]; then
        mkdir $DEPLOY_FOLDER
    fi 
    cp -r dist/* $DEPLOY_FOLDER
    cp rootIndex.html $DEPLOY_FOLDER/../index.html
}

###########################################################################
#
#
#
###########################################################################
deployApi()
{
    cd phpApi/api
    #ls -al
    DEPLOY_FOLDER="$DEPLOY_REPO_PATH/api"
    
      if [ ! -d "$DEPLOY_FOLDER" ]; then
        mkdir $DEPLOY_FOLDER
    fi
    cp -r * $DEPLOY_FOLDER
    
    cd ../..
}

###########################################################################
#
# Push to git
#
###########################################################################
pushtoGit()
{
    cd $DEPLOY_REPO_PATH
    git pull
    git add .
    d=$( date '+%F_%H:%M:%S' )
    git commit -m $d
    git push origin
    git ftp push 
}

#
###########################################################################
#
#   Main script
#
###########################################################################
echo "###########################################################################" 
echo Building templates
echo "###########################################################################" 
build

cd dist
echo giving read and write permissions to all files
sudo chmod -R 0777 *

for FOLDER in */  ; do
    echo "###########################################################################" 
    echo "Deploying $FOLDER .";
    echo "###########################################################################" 
    echo 
    cd $FOLDER
    installModulesAndBuild
    deployFront

    cd .. 
done
cd ..
deployApi
pushtoGit
##cd ..