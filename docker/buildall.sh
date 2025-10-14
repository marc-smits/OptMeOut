#!/bin/sh

###########################################################################
#
# Build all locales with cached node_modules and copy to html
#
###########################################################################

# Remove existing HTML output
rm -rf dist_html/*

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

    echo "##########"
    echo "Unlinking cached node_modules";
    unlink node_modules

    cd ..

    echo "##########"
    echo "Copying output HTML to dist_html/$LOCALE";
    mkdir -p ../dist_html/$LOCALE
    cp -R $LOCALE/dist/* ../dist_html/$LOCALE

    echo "##########"
    echo "Copying root index file to dist_html";
    cp index.html ../dist_html
done

# Allow access outside this container
chmod -R 0777 *
