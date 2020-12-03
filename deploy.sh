msg="commit at $now"
if [[ ! -z "$1" ]]
then 
    msg="$1"
fi
now=$(date +"%T")
git status
git add .
git commit -m "$msg"
git push deploy master