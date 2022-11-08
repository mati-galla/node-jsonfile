let _fs;
try {
  _fs = require("graceful-fs");
} catch (_) {
  _fs = require("fs");
}
const universalify = require("universalify");
const { stringify, stripBom } = require("./utils");

async function _readFile(file, options = {}) {
  if (typeof options === "string") {
    options = { encoding: options };
  }

  const fs = options.fs || _fs;

  const shouldThrow = "throws" in options ? options.throws : true;

  let data = await universalify.fromCallback(fs.readFile)(file, options);

  data = stripBom(data);

  let obj;
  try {
    obj = JSON.parse(data, options ? options.reviver : null);
  } catch (err) {
    if (shouldThrow) {
      err.message = `${file}: ${err.message}`;
      throw err;
    } else {
      return null;
    }
  }
  console.log(
    `El  archivo ${file} fue leido correctamente utilizando jsonfile.readFile`
  );
  return obj;
}

const readFile = universalify.fromPromise(_readFile);

function readFileSync(file, options = {}) {
  if (typeof options === "string") {
    options = { encoding: options };
  }

  const fs = options.fs || _fs;

  const shouldThrow = "throws" in options ? options.throws : true;

  try {
    let content = fs.readFileSync(file, options);
    content = stripBom(content);
    console.log(
      `El  archivo ${file} fue leido correctamente utilizando jsonfile.readFileSync`
    );
    return JSON.parse(content, options.reviver);
  } catch (err) {
    if (shouldThrow) {
      err.message = `${file}: ${err.message}`;
      throw err;
    } else {
      return null;
    }
  }
}

async function _writeFile(file, obj, options = {}) {
  const fs = options.fs || _fs;

  const str = stringify(obj, options);

  await universalify.fromCallback(fs.writeFile)(file, str, options);

  console.log(
    `El  archivo ${file} fue escrito correctamente utilizando jsonfile.writeFile`
  );
}

const writeFile = universalify.fromPromise(_writeFile);

function writeFileSync(file, obj, options = {}) {
  const fs = options.fs || _fs;

  const str = stringify(obj, options);
  console.log(
    `El  archivo ${file} fue escrito correctamente utilizando jsonfile.writeFileSync`
  );
  // not sure if fs.writeFileSync returns anything, but just in case
  return fs.writeFileSync(file, str, options);
}

const jsonfile = {
  readFile,
  readFileSync,
  writeFile,
  writeFileSync,
};

module.exports = jsonfile;
