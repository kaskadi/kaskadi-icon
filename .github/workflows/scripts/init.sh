#!/bin/bash
BRANCH_NAME="$(node -e "const refs = process.env.GITHUB_REF.split('/'); console.log(refs[refs.length - 1])")"
if [ "$BRANCH_NAME" == "master" ]
then
  # Install kaskadi-cli
  npm i kaskadi-cli
  # Init
  ./node_modules/kaskadi-cli/kaskadi init
  npm rm kaskadi-cli
  # Commit files
  git config --global user.name 'Holger Will'
  git config --global user.email 'h.will@klimapartner.de'
  git add *.js
  git rm .github/workflows/init.yml
  git rm .github/workflows/scripts/init.sh
  git commit -am "Initial commit"
  git push
else
  echo "Branch is not master, not proceeding to initialize repository."
fi
