#!/usr/bin/env bash

set -e
set -x

CURRENT_BRANCH="1.x"
REMOTES=("website")

function split()
{
    SHA1=`./bin/splitsh-lite --prefix=$1`
    git push $2 "$SHA1:refs/heads/$CURRENT_BRANCH" -f
}

function remote()
{
    git remote add $1 $2 || true
}

git pull origin $CURRENT_BRANCH


for REMOTE in ${REMOTES[@]}; do
  remote $REMOTE "https://KanagawaRifle/kanagawa-rifle-$REMOTE.git"
  split 'packages/$REMOTE' $REMOTE
done
