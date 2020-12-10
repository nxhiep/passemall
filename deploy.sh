# msg=$1
# if [[ -z "$msg" ]] 
# then
#     now=$(date +"%T")
#     msg="commit at $now"
# fi
# git status
# git add .
# git commit -m "$msg"
# git push deploy master

app=$1
if [ "$app" = "cdl" ]
then
    echo "Deploy CDL"
elif [ "$app" = "asvab" ]
then
    echo "Deploy ASVAB"
elif [ "$app" = "ged" ]
then
    echo "Deploy GED"
elif [ "$app" = "teas" ]
then
    echo "Deploy TEAS"
else
    echo "Deploy PASSEMALL"
fi