const fs = require("fs");

module.exports = async (func, cacheFile, ...params) => {
  if (fs.existsSync(`./${cacheFile}.json`)) {
    return require(`../${cacheFile}.json`);
  }

  const data = await func(...params);

  fs.writeFileSync(
    `./${cacheFile}.json`,
    JSON.stringify(data, null, 4),
    "utf8"
  );

  return data;
};
