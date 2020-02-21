import React, { useEffect, useState, useCallback } from "react";
import Map from "./components/Map";
import Tiles from "./components/Tiles";
import Video from "./components/Video";

export default () => {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);

  const selectNext = useCallback(() => {
    setSelected(data[selected + 1] ? selected + 1 : 0);
  }, [data, selected]);

  useEffect(() => {
    fetch("/data.json")
      .then(res => res.json())
      .then(res => {
        setData(res);
        setSelected(0);
      });
  }, []);

  return (
    data && (
      <>
        <Tiles data={data} setSelected={setSelected}>
          <div className="spanned">
            <div>
              <Map data={data} selected={selected} setSelected={setSelected} />
            </div>
            <div>
              <Video selectNext={selectNext} selectedItem={data[selected]} />
            </div>
          </div>
        </Tiles>
      </>
    )
  );
};
