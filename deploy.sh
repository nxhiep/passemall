now=$(date +"%T")
git status
git add .
git commit -m "commit at $now"
git push deploy master