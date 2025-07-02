import React from "react";

import { useSheetsStore } from "./SheetsStore";

const SheetsStoreComponent = () => {
  return (
    <>
      {useSheetsStore.getState().sheets.map(({ Component, key, ref }) => (
        <Component key={key} ref={ref} />
      ))}
    </>
  );
};

export default SheetsStoreComponent;
