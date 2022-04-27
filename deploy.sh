#!/bin/bash

pushd dist
git init
git add -A
git commit -m "update"
git remote add origin git@github.com:monman53/monman53.github.io.git
git push -f origin master:gh-pages
popd