# git checkout cdl
# git pull --rebase origin cdl

ROOT_PATH="./public/info"
DATA_PATH="./src/data"
VERSION="2.0.3"

downloadFile() {
    curl -o "$DATA_PATH/appInfos.json" "https://micro-enigma-235001.appspot.com/new/api?type=get-map-app"
}

addConfig() {
    appId=$1
    gaId=$2
    appName=$3
    file="./src/config_app.js"
    > $file
    echo "export const APP_NEW_DOMAIN = $appId;\nexport const GA_ID = '$gaId';\nexport const APP_SHORT_NAME = '$appName';\nexport const VERSION = '$VERSION';">>$file
}

getGaId() {
    app=$1
    if [ "$app" = "cdl" ]
    then
        echo 'UA-167769768-3'
        return 1
    fi
    if [ "$app" = "asvab" ]
    then
        echo 'UA-167769768-2'
        return 1
    fi
    if [ "$app" = "ged" ]
    then
        echo 'UA-167769768-4'
        return 1
    fi
    if [ "$app" = "teas" ]
    then
        echo 'UA-167769768-5'
        return 1
    fi
    echo 'UA-167769768-1'
}

getAppId() {
    app=$1
    if [ "$app" = "cdl" ]
    then
        echo 5722070642065408
        return 1
    fi
    if [ "$app" = "asvab" ]
    then
        echo 5734055144325120
        return 1
    fi
    if [ "$app" = "ged" ]
    then
        echo 5296397775536128
        return 1
    fi
    if [ "$app" = "teas" ]
    then
        echo 5186025303310336
        return 1
    fi
    echo false
}

deploy() {
    appName=$1
    appId=$(getAppId $appName)
    gaId=$(getGaId $appName)
    if [ -z "$appName" ]
    then
        appPath=""
        logoPath="main"
    else
        logoPath=$appName
        appPath="-$appName"
    fi
    downloadFile
    cp -r "$ROOT_PATH/sitemaps/sitemap$appPath.xml" ./public/sitemap.xml
    cp -r "$ROOT_PATH/robots/robots$appPath.txt" ./public/robots.txt
    cp -r "$ROOT_PATH/manifests/manifest$appPath.json" ./public/manifest.json
    cp -r "$ROOT_PATH/images/$logoPath/logo60.png" "$ROOT_PATH/images/logo60.png"
    cp -r "$ROOT_PATH/images/$logoPath/logo192.png" "$ROOT_PATH/images/logo192.png"
    cp -r "$ROOT_PATH/images/$logoPath/logo512.png" "$ROOT_PATH/images/logo512.png"
    addConfig $appId $gaId $appName
}

deploy $1