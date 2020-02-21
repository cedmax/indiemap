import React from "react";
import SimpleInput from "react-simple-input";
export default ({ filterData }) => {
  return (
    <SimpleInput
      placeholder="Filter..."
      clearButton
      onChange={e => filterData(e.target.value)}
    />
  );
};
