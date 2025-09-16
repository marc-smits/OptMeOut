
#####################################################################################
#
#  A script to deploy the files to a remote server
#
#
####################################################################################

echo "###########################################################################" 
echo
echo Usage
echo 
echo "1) Copy the file scripts/deploy.config_sample to scripts/deploy.config_sample"
echo "   and configure with the correct parameters"
echo "2) Make the translation by : python build.py"
echo "3) Execute this script"
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


#
# Install npm modules and build
#
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

#
# Deploy
#
deploy()
{
    
    locale=${PWD##*/}
    echo $DEPLOY_REPO_PATH $locale
    ls $DEPLOY_REPO_PATH
    DEPLOY_FOLDER="$DEPLOY_REPO_PATH/$locale"
    echo $DEPLOY_FOLDER
    if [! -d "$DEPLOY_FOLDER" ]; then
        mkdir $DEPLOY_FOLDER
    fi 
    mkdir $DEPLOY_FOLDER
    cp -r dist/* $DEPLOY_FOLDER
}

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
#
###########################################################################
#
#   Main script
#
###########################################################################

 

cd dist
echo giving read and write permissions to all files
sudo chmod -R 0777 *

for FOLDER in */  ; do
    echo "###########################################################################" 
    echo "Deploying $FOLDER .";
    echo "###########################################################################" 
    echo 
    cd $FOLDER
    #installModulesAndBuild
   #deploy

    cd .. 
done
cd ..
deployApi

##cd ..