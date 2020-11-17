# git checkout cdl
# git pull --rebase origin cdl

ROOT_PATH="./public/info"

deploy() {
    cp -r "$ROOT_PATH/sitemaps/sitemap.xml" ./public/sitemap.xml
    cp -r "$ROOT_PATH/robots/robots.txt" ./public/robots.txt
    cp -r "$ROOT_PATH/manifests/manifest.json" ./public/manifest.json
}

deployCDL() {
    cp -r "$ROOT_PATH/sitemaps/sitemap-cdl.xml" ./public/sitemap.xml
    cp -r "$ROOT_PATH/robots/robots-cdl.txt" ./public/robots.txt
    cp -r "$ROOT_PATH/manifests/manifest.json" ./public/manifest.json
}

deploy