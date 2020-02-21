import React, { useEffect, useState, useCallback } from "react";
import Map from "./components/Map";
import Tiles from "./components/Tiles";
import Video from "./components/Video";
import Filter from "./components/Filter";

const FIRST_CITY = "Aberdeen";

export default () => {
  const [originalData, setOriginalData] = useState(null);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then(res => res.json())
      .then(res => {
        setOriginalData(res);
        setData(res);
        setSelected(FIRST_CITY);
      });
  }, []);

  const selectNext = useCallback(() => {
    const currentIndex = data.findIndex(({ city }) => city === selected) || 0;
    setSelected(data[currentIndex + 1] ? data[currentIndex + 1].city : 0);
  }, [data, selected]);

  const filterData = useCallback(
    value => {
      setData(
        !value
          ? originalData
          : originalData.filter(({ city }) =>
              city.toLowerCase().startsWith(value.toLowerCase())
            )
      );
    },
    [originalData]
  );

  return (
    data &&
    originalData && (
      <Tiles data={data} setSelected={setSelected}>
        <div className="spanned">
          <div>
            <Map
              data={originalData}
              setSelected={setSelected}
              selectedItem={originalData.find(({ city }) => city === selected)}
            />
          </div>
          <div>
            <Video
              selectNext={selectNext}
              selectedItem={data.find(({ city }) => city === selected)}
            />
          </div>
        </div>
        <Filter filterData={filterData} />
      </Tiles>
    )
  );
};
