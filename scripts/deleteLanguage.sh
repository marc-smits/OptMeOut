
#####################################################################################
#
#  A script to delete one language
#
#
####################################################################################

echo "###########################################################################" 
echo
echo Usage
echo 
echo "1) Copy the file scripts/deploy.config_sample to scripts/deploy.config_sample"
echo "   and configure with the correct parameters"
echo "3) Execute this script by giving the locale to delete"
echo "   Example : "
echo "              ./scripts/deleteLanguage.sh fi_FI"
echo 
echo "4) build all of the templates by : python build.py"
echo "5) Deploy by : ./scripts/deploy.sh"
echo
echo "###########################################################################" 
read -p "Press enter to continue"

if [ $# -lt 1 ]
  then
    echo "Usage:  ./scripts/deleteLanguage.sh LOCALE"
    echo
    exit 0
fi


# Read config variables 
. scripts/deploy.config


###########################################################################
#
#   Functions
#
###########################################################################


#
# Delete local files
#
deleteLocalFiles(){
    declare -a arr=("dist/$LOCALE") 
    for folder in "${arr[@]}"
    do

        if [ -d "$folder" ]; then
        rm -rf $folder
        echo Folder $folder deleted 
    fi
    done

    if [ -d "$DIRECTORY" ]; then
    echo "$DIRECTORY does exist."
    fi
    declare -a arr=("src/csv/export/$LOCALE.csv" "src/csv/import/$LOCALE.csv" "src/languages/$LOCALE.json")
    for file in "${arr[@]}"
    do
        if test -f $file ; then
        rm  $file 
        echo File $file deleted 
    fi
done
}

#
# Delete files in server
#
deleteFilesInServer()
{
    echo "Clean up server";
    ftp -n $HOST <<END_SCRIPT
        user ${USER} ${PASSWD}
        
        mdelete ${LOCALE}/assets/*
        rmdir ${LOCALE}/assets
        mdelete ${LOCALE}/*
        rmdir ${LOCALE}
END_SCRIPT
}


###########################################################################
#
#   Main script
#
###########################################################################


echo giving read and write permissions to all files
sudo chmod -R 0777 *

LOCALE=$1

deleteLocalFiles
deleteFilesInServer





