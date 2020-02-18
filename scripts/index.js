require("dotenv").config();
const withCache = require("./with-cache");
(async () => {
  const data = await withCache(require("./youtube"), "./data/youtube");
  const finalData = await withCache(
    require("./consolidate"),
    "./public/data",
    data
  );
  console.log(finalData);
})();
