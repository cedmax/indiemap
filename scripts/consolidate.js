const csv = require("csvtojson");

const csvFilePath = "./data/songs.csv";

module.exports = async yData => {
  let data = await csv().fromFile(csvFilePath);
  data = data.map((item, i) => ({
    ...item,
    video: {
      thumbnails: yData[i].thumbnails.medium,
      id: yData[i].resourceId.videoId,
      duration: yData[i].duration
    }
  }));
  return data;
};
