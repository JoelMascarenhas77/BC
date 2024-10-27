create a file as such

package.json
{
"name": "shande",
"version": "1.0.0",
"description": "Medical Records blockchain app",
"main": "index.js",
"scripts": {
"migrate": "truffle migrate --network development",
"console": "truffle console --network development"
},
"license": "MIT",
"dependencies": {
"truffle": "^5.6.0",
"web3": "^1.6.0",
"dotenv": "^10.0.0",
"express": "^4.17.1"
},
"devDependencies": {
"solc": "0.8.0"
}
}

install the packages
$npm install

create a truffle project
$ npx truffle init

compile truffle
$ npx truffle compile

make migrations
$ npx truffle migrate --network development
