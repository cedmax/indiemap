import React from "react";

export default ({ data, setSelected, children }) => (
  <div id="videos">
    {children}
    <div className="container">
      {data.map((item, i) => (
        <img
          alt={`${item.city} by ${item.artist}`}
          key={item.city}
          onClick={() => setSelected(i)}
          src={item.video.thumbnails.url}
        />
      ))}
    </div>
  </div>
);
