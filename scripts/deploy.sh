
#####################################################################################
#
#  A script to deploy the files to a remote server
#
#
####################################################################################



SERVER=$1

if [ "$SERVER" != "live"  ] &&  [ "$SERVER" != "staging"  ]; then
    echo "Usage:  ./scripts/deploy.sh SERVER  (SERVER live or staging)"
    echo
    exit 0
fi

echo "###########################################################################" 
echo
echo Deploying to $SERVER server
echo 
echo 
echo "###########################################################################" 
read -p "Press enter to continue"

# Read config variables 
. scripts/deploy.config

DEPLOY_REPO_PATH="${PWD/}/deploy_opt_me_out"
GIT_SOURCE_CODE_BRANCH=$GIT_STAGING_SOURCE_CODE_BRANCH


GIT_BRANCH=$GIT_STAGING_DEPLOY_BRANCH
FTP_SERVER=$FTP_STAGING_SERVER
FTP_USER=$FTP_STAGING_USER
FTP_PASSWORD=$FTP_STAGING_PASSWORD

if [ "$SERVER" = "live"  ]; then
    GIT_BRANCH=$GIT_LIVE_DEPLOY_BRANCH
    GIT_SOURCE_CODE_BRANCH=$GIT_STAGING_LIVE_CODE_BRANCH
    FTP_SERVER=$FTP_LIVE_SERVER
    FTP_USER=$FTP_LIVE_USER
    FTP_PASSWORD=$FTP_LIVE_PASSWORD
fi






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
    git checkout $GIT_BRANCH
    git config git-ftp.user $FTP_USER
    git config git-ftp.url $FTP_SERVER
    git config git-ftp.password "$FTP_PASSWORD"
    git pull

    git add .
    d=$( date '+%F_%H:%M:%S' )
    git commit -m $d
    git push origin $GIT_BRANCH
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

git checkout $GIT_STAGING_LIVE_CODE_BRANCH

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