msg=$1
if [[ -z "$msg" ]] 
then
    now=$(date +"%T")
    msg="commit at $now"
fi
git status
git add .
git commit -m "$msg"
git push deploy master