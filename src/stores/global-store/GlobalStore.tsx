import React, { FC } from "react";

import DialogsStoreComponent from "./dialogs-store/DialogsStoreComponent";
import SheetsStoreComponent from "./sheets-store/SheetsStoreComponent";
import SnackbarStoreComponent from "./snackbar-store/SnackbarStoreComponent";

const GlobalStore: FC = () => {
  return (
    <>
      <SnackbarStoreComponent />
      <SheetsStoreComponent />
      <DialogsStoreComponent />
    </>
  );
};

export default GlobalStore;
