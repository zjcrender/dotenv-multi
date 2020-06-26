const fs = require('fs');

function isFile(filePath) {
  let isFile;
  try {
    const stat = fs.statSync(filePath);
    isFile = stat.isFile();
  } catch (err) {
    isFile = false;
  }
  return isFile;
}

function isReadable(path) {
  let readable;
  try {
    fs.accessSync(path, fs.constants.R_OK);
    readable = true;
  } catch ( e ) {
    readable = false;
  }
  return readable;
}

module.exports.isFile = isFile;
module.exports.isReadable = isReadable;
