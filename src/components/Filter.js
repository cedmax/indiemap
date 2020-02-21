import React from "react";

export default ({ filterData }) => {
  return (
    <input placeholder="Filter..." onChange={e => filterData(e.target.value)} />
  );
};
