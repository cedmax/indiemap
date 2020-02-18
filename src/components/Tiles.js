import React from "react";

export default ({ data, setSelected, children }) => (
  <div id="videos">
    <div className="container">
      {children}
      {data.map(item => (
        <img
          alt={`${item.city} by ${item.artist}`}
          key={item.city}
          onClick={() => setSelected(item)}
          src={item.video.thumbnails.url}
        />
      ))}
    </div>
  </div>
);
