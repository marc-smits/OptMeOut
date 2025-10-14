#!/bin/sh

###########################################################################
#
# Build all locales with cached node_modules and copy to html
#
###########################################################################

# Reset existing HTML output
rm -rf /html/*

# Loop through each locale in dist and build
cd dist
for DIR in */; do
    # Strip trailing slash and change to directory
    LOCALE=${DIR%/}
    cd $LOCALE

    echo
    echo "###########################################################################"
    echo "Building locale $LOCALE"
    echo "###########################################################################"
    echo

    echo "##########"
    echo "Linking cached node_modules";
    rm -rf node_modules
    ln -s /node_nodules node_modules

    echo "##########"
    echo "Building";
    rm -rf dist
    npm run build -- --debug

    # echo "##########"
    # echo "Updating index file with correct asset path";
    # sed -i "s/\/assets/\/${LOCALE}\/assets/g" dist/index.html

    echo "##########"
    echo "Copying output HTML to html/$LOCALE";
    mkdir -p /html/$LOCALE
    cp -R dist/* /html/$LOCALE
    cp rootIndex.html /html/index.html

    echo "##########"
    echo "Unlinking cached node_modules";
    unlink node_modules

    cd ..
done

# Allow access outside this container
chmod -R 0777 *
