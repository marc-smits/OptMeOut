
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
. scripts/deploy.config


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
    locale=${PWD##*/}; sed -i "s/\/assets/\/$locale\/assets/g" dist/index.html
}

#
# Deploy
#
deploy()
{
    
    echo "##########"
    echo "Clean up folder";
    ftp -n $HOST <<END_SCRIPT
        user ${USER} ${PASSWD}
        
        mdelete ${FOLDER}/assets/*
        rmdir ${FOLDER}/assets
        mdelete ${FOLDER}/*
        rmdir ${FOLDER}
        mkdir ${FOLDER}
        mkdir ${FOLDER}/assets
END_SCRIPT
    
    SOURCE_FOLDER=dist
    TARGET_FOLDER=${FOLDER}
    transferFilesFromLocalToRemote

    SOURCE_FOLDER=dist/assets
    TARGET_FOLDER=${FOLDER}/assets
    transferFilesFromLocalToRemote
}

#
# Transfer files from a local folder to remote folder
#
transferFilesFromLocalToRemote() 
{    
    cd $SOURCE_FOLDER
    for file in ./*; do
          if [ -f "${file}" ] ; then
            putFileToRemote
          fi
      done
    cd ..
}

#
# Transfer one file from a local folder to remote folder
#
putFileToRemote()
{
  echo Transfering file from ${SOURCE_FOLDER}${file}
   # ftp -n $HOST <<END_SCRIPT -v
    ftp -n $HOST <<END_SCRIPT
    user ${USER} ${PASSWD}
    cd ${TARGET_FOLDER}
    put $file
    quit
END_SCRIPT

}

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
    installModulesAndBuild
    deploy
exit
    cd .. 
done
cd ..


