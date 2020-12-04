c1="\"..\/"
c2="\""
echo $(sed "s/$c1/$c2/g" src/pages/index.jsx) > src/pages/index.jsx