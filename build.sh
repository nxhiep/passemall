# git checkout cdl
# git pull --rebase origin cdl

ROOT_PATH="./public/info"

addConfig() {
    value=$1
    file="./src/config_app.js"
    > $file
    echo "export const APP_NEW_DOMAIN = $value">>$file
}

deploy() {
    cp -r "$ROOT_PATH/sitemaps/sitemap.xml" ./public/sitemap.xml
    cp -r "$ROOT_PATH/robots/robots.txt" ./public/robots.txt
    cp -r "$ROOT_PATH/manifests/manifest.json" ./public/manifest.json
    addConfig false
}

deployCDL() {
    cp -r "$ROOT_PATH/sitemaps/sitemap-cdl.xml" ./public/sitemap.xml
    cp -r "$ROOT_PATH/robots/robots-cdl.txt" ./public/robots.txt
    cp -r "$ROOT_PATH/manifests/manifest.json" ./public/manifest.json
    addConfig 5722070642065408
}

deployCDL