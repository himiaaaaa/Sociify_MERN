#!/bin/bash

echo "Build script"

# add the commands here

npm install && cd ../client && npm install && cd ..
rm -rf build && cd ../client && npm run build && cp -r build ../server