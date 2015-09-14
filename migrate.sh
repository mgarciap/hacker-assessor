#!/bin/bash

for migration in $(ls migrations)
do
  if [ "${migration##*.}" = "js" ]
    then node "migrations/${migration}"
  fi
done
