cd ./src
copy "./*" "../out/"
cd ../reactApp
call npm run build
cd ./dist
copy "./*" "../../out"