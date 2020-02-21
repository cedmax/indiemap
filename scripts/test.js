/*eslint no-console: 0 */

require("colors");
const axios = require("axios");
const data = require("../public/data.json");

const videos = data.map(({ video: { id }, city }) => ({ id, city }));

async function validateVideos(list) {
  const video = list.shift();
  console.log("VALIDATING: ".bold + video.city);
  const url = `https://www.youtube.com/watch?v=${video.id}`;
  try {
    const { data } = await axios.get(`http://noembed.com/embed?url=${url}`);
    if (data.error) {
      throw new Error(data.error);
    }
    console.log(` GREAT: ${url}`.green);
  } catch (err) {
    console.error(` FAILED: ${url}`.red);
    console.error(` ${err}`);
    process.exit(1);
  }
  if (list.length) {
    validateVideos(list);
  } else {
    console.log("\nALL GOOD!".bold.green);
  }
}

validateVideos(videos);
