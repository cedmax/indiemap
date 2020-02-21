import React, { useEffect, useState } from "react";
import YTPlayer from "yt-player";

export default ({ selectedItem, selectNext }) => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    if (!selectedItem) return;

    let localPlayer;
    if (!player) {
      localPlayer = new YTPlayer("#ytplayer", {
        autoplay: true,
        controls: false,
        related: false,
        annotations: false,
        modestBranding: true
      });
      setPlayer(localPlayer);
      return;
    } else {
      localPlayer = player;
    }
    localPlayer.on("ended", selectNext);
    localPlayer.load(selectedItem.video.id, true);
  }, [selectedItem, player, selectNext]);
  return (
    <div className="youtube">
      <div id="ytplayer"></div>
    </div>
  );
};
