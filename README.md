# Welcome to dotenv-multi 👋
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

English | [中文文档](./README-zh.md)

`dotenv-multi` Use [dotenv](https://github.com/motdotla/dotenv) to parse and load variables from multiple env files to process.env, and distinguish between different modes.

## Install

```sh
// with npm
npm install dotenv-multi

// with yarn
yarn add dotenv-multi
```

## Usage
```javascript
const dotenvMulti = require('dotenv-multi');
dotenvMulti.loadEnv({ dir: 'path/to/envFileDir', mode: 'myMode' });
```

## API

### loadEnv(options: [LoadOptions](#LoadOptions)): [Result](#Result)
loadEnv will parse and merge the following files into `process.env` in the `dir` folder.
- .env
- .env.local
- .env.[mode]
- .env.[mode].local

Note：
1. Priority of the above files from low to high
2. The file will be skipped if the file does not exist
3. Will not overwrite the original value in `process.env`
4. The method used to merge the variables in the file is "Object.assign".

## Example
Assume that there are some env files in the `env/` folder
```
// .env
foo=foooooo
URL=api.default.com
endpoint=path/to/endpoint

// .env.dev
URL=api.dev.com

// .env.local
URL=api.dev-local.com
e1=some-local-var

//.env.stg
URL=api.stg.com

//.env.prd
bar=barrrrr
URL=api.prd.com

//.env.prd.local
URL=api.prd.com
enpoint=/another/path/to/endpoint
proxy=/another
```
  
Suppose we distinguish the modes through `process.env.API`
```javascript
const dotenvMulti = require('dotenv-multi');
dotenvMulti.loadEnv({ dir: './env', mode: process.env.API }); 
```
Start the script in different ways as follows
```shell script
# load .env、.env.local、.env.dev、.env.dev.local
$ cross-env API=dev npm run some-script

# load .env、.env.local、.env.stg、.env.stg.local
$ cross-env API=stg npm run some-script

# load .env、.env.local、.env.prd、.env.prd.local
$ cross-env API=prd npm run some-script
```
Then we can get the corresponding environment variables in the project


## Interface
### LoadOptions
|Key|Type|Default|Required|Description|
|---|---|---|---|---|
|dir|string|`process.cwd()`|N|Directory path where `env` files are stored|
|mode|string|process.env.NODE_ENV|N|current mode|

### Result: ParseSuccess | ParseError
```typescript
interface ParseSuccess {
  parsed: { [props: string]: string };
  error: null;
}

interface ParseError {
  error: Error;
  parsed: null;
}
```


## Author

👤 **render**

* Website: http://render.ink
* Github: [@zjcrender](https://github.com/zjcrender)

## Show your support

Give a ⭐️ if this project helped you!
