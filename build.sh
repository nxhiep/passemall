# git checkout cdl
# git pull --rebase origin cdl

ROOT_PATH="./public/info"

addConfig() {
    appId=$1
    gaId=$2
    file="./src/config_app.js"
    > $file
    echo "export const APP_NEW_DOMAIN = $appId;\nexport const GA_ID = '$gaId';">>$file
}

getGaId() {
    app=$1
    if [ "$app" = "cdl" ]
    then
        echo '253313963'
        return 1
    fi
    if [ "$app" = "asvab" ]
    then
        echo '253286832'
        return 1
    fi
    if [ "$app" = "ged" ]
    then
        echo '253293094'
        return 1
    fi
    if [ "$app" = "teas" ]
    then
        echo '253275154'
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
    app=$1
    appId=$(getAppId $app)
    gaId=$(getGaId $app)
    if [ -z "$app" ]
    then
        app=""
        logoPath="main"
    else
        logoPath=$app
        app="-$app"
    fi
    cp -r "$ROOT_PATH/sitemaps/sitemap$app.xml" ./public/sitemap.xml
    cp -r "$ROOT_PATH/robots/robots$app.txt" ./public/robots.txt
    cp -r "$ROOT_PATH/manifests/manifest$app.json" ./public/manifest.json
    cp -r "$ROOT_PATH/images/$logoPath/logo60.png" "$ROOT_PATH/images/logo60.png"
    cp -r "$ROOT_PATH/images/$logoPath/logo192.png" "$ROOT_PATH/images/logo192.png"
    cp -r "$ROOT_PATH/images/$logoPath/logo512.png" "$ROOT_PATH/images/logo512.png"
    addConfig $appId $gaId
}

deploy
# yarn
# yarn build