import React, { useEffect, useState } from "react";
import Map from "./components/Map";
import Tiles from "./components/Tiles";
import Video from "./components/Video";

export default () => {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    fetch("/data.json")
      .then(res => res.json())
      .then(res => {
        setData(res);
        setSelected(res[0]);
      });
  }, []);

  return (
    <>
      <Map data={data} selected={selected} setSelected={setSelected} />
      <Tiles data={data} setSelected={setSelected}>
        <Video selected={selected} />
      </Tiles>
    </>
  );
};
