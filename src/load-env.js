const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { isFile, isReadable } = require('./utils');

const DEFAULT_OPTIONS = {
  dir: process.cwd(),
  mode: process.env.NODE_ENV,
}

function loadEnv(options) {
  const { dir, mode } = { ...DEFAULT_OPTIONS, ...options };

  const basicEnvFilePath = path.resolve(dir, '.env');
  const modeEnvFilePath = path.resolve(dir, `.env.${mode}`);

  try {
    const parsed = [basicEnvFilePath, modeEnvFilePath].reduce((parsed, current) => {
      const currentLocal = `${current}.local`;
      [current, currentLocal].forEach(filePath => {
        if (isFile(filePath) && isReadable(filePath))
          Object.assign(parsed, dotenv.parse(fs.readFileSync(filePath)) );
      })
      return parsed;
    }, {});
    dotenvExpand({ parsed });
    return { parsed, error: null };
  } catch ( error ) {
    return { error, parsed: null };
  }

}

module.exports = loadEnv;
