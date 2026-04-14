
Web Deploy
npx expo export -p web -c

rm -rf ~/projects/infra/scripts/xword/frontend/dist/*
cp -r dist/* ~/projects/infra/scripts/xword/frontend/dist
