import React from "react";

export default ({ selected }) =>
  selected && (
    <div className="youtube">
      <iframe
        title={`${selected.city} by ${selected.artist}`}
        src={`https://www.youtube.com/embed/${selected.video.id}?autoplay=1`}
        frameBorder="0"
      ></iframe>
    </div>
  );
