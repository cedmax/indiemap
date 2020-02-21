import React from "react";

export default ({ data, setSelected, children }) => (
  <div id="videos">
    {children}
    <div className="container">
      {data.map(item => (
        <div key={item.city} data-name={item.city}>
          <img
            alt={`${item.city} by ${item.artist}`}
            key={item.city}
            onClick={() => setSelected(item.city)}
            src={item.video.thumbnails.url}
          />
        </div>
      ))}
    </div>
  </div>
);
