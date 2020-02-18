const fs = require("fs");
const { google } = require("googleapis");

const filename = "data";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.GOOGLE_KEY
});

const fetch = async (results, pageToken) => {
  const options = {
    playlistId: "PLn95dznFTGUOY4G3FhZZBj-Z7Tdny3jlq",
    part: "snippet,contentDetails",
    maxResults: 50
  };

  if (pageToken) {
    options.pageToken = pageToken;
  }
  const { data } = await youtube.playlistItems.list(options);

  for (let i = 0; i < data.items.length; i++) {
    const { videoId } = data.items[i].contentDetails;
    const {
      data: { items }
    } = await youtube.videos.list({
      id: videoId,
      part: "contentDetails"
    });

    data.items[i].contentDetails = items[0].contentDetails;
  }

  results = [...results, ...data.items];
  if (data.nextPageToken) {
    return fetch(results, data.nextPageToken);
  }

  if (results[0].snippet) {
    results = results.map(({ snippet, contentDetails }) => ({
      ...snippet,
      duration: contentDetails.duration
    }));
  }

  return results;
};

module.exports = async () => await fetch([]);
