# 欢迎使用 dotenv-multi 👋
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](doc)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

[English](./README.md) | 中文文档

`dotenv-multi` 使用 [dotenv](https://github.com/motdotla/dotenv) 从多个`env`文件中解析、加载变量至`process.env`，并支持区分不同模式。

## 安装

```sh
// 使用 npm
npm install dotenv-multi

// 使用 yarn
yarn add dotenv-multi
```

## 使用
简单示例
```javascript
const dotenvMulti = require('dotenv-multi');
dotenvMulti.loadEnv({ dir: 'path/to/envFileDir', mode: 'myMode' });
```

## API

### loadEnv(options: [LoadOptions](#LoadOptions)): [Result](#Result)
loadEnv将在`dir`文件夹下，将下述文件解析、合并后加载至`process.env`中。
- .env
- .env.local
- .env.[mode]
- .env.[mode].local

注意：
1. 上述文件优先级由低至高
2. 若文件不存在则该文件会被跳过
3. 不会覆盖`process.env`中原先的值
4. 文件中变量合并所采用的方式为`Object.assign`

## 示例
假定在工程`env/`文件夹下有如下几个文件
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
  
假定我们通过`process.env.API`区分模式
```javascript
const dotenvMulti = require('dotenv-multi');
dotenvMulti.loadEnv({ dir: './env', mode: process.env.API }); 
```
通过如下不同方式启动脚本
```shell script
# load .env、.env.local、.env.dev、.env.dev.local
$ cross-env API=dev npm run some-script

# load .env、.env.local、.env.stg、.env.stg.local
$ cross-env API=stg npm run some-script

# load .env、.env.local、.env.prd、.env.prd.local
$ cross-env API=prd npm run some-script
```
然后我们可以在项目中获取到相应的环境变量


## 参数说明
### LoadOptions
|key|类型|默认值|是否必填|说明|
|---|---|---|---|---|
|dir|string|`process.cwd()`|否|存放`env`文件的目录地址|
|mode|string|process.env.NODE_ENV|否|当前模式|

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

## 支持

给颗小星星吧 ⭐️ 如果你觉得`dotenv-multi`还阔以的话
