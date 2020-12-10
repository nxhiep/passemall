deploy() {
    app=$1
    echo "Deploying $app"
    git branch -D $app
    git checkout -b $app
    ./build.sh $app
    git add .
    now=$(date +"%T")
    git commit -m "deploy $app at $now"
    git push $app $app -f
    git checkout app
}
app=$1
branch=$(git branch --show-current)
if [ "$branch" = "app" ]; then
    deploy $app
else
    echo "Not branch app"
fi