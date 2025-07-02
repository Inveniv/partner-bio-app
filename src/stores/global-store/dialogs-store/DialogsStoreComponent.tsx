import React, { useMemo } from "react";
import { StyledView } from "utils/styled";

import { useDialogsStore } from "./DialogsStore";

const DialogsStoreComponent = () => {
  const dialogs = useDialogsStore((s) => s.dialogs);
  const hasOpenDialog = useMemo(() => dialogs.some((d) => d.open), [dialogs]);

  return (
    <StyledView
      className="flex absolute z-20 h-full w-full"
      pointerEvents={hasOpenDialog ? "auto" : "none"}
    >
      {dialogs.map(({ Component, open, key, params }) => (
        <Component
          key={key}
          visible={open}
          handleClose={() => useDialogsStore.getState().closeDialog(key)}
          {...params}
        />
      ))}
    </StyledView>
  );
};

export default DialogsStoreComponent;
