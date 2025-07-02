import { cloneDeep, delay } from "lodash";
import { FC } from "react";
import { create } from "zustand";

import { defaultDialogs } from "./dialogs";

type DialogsState = {
  dialogs: {
    key: string;
    Component: FC;
    precheck?: () => Promise<boolean>;
    open: boolean;
    params: any;
  }[];
};

type DialogsActions = {
  openDialog: (key: string, params?: any) => void;
  closeDialog: (key: string) => void;
};

const DIALOGS_INITIAL_STATE: DialogsState = {
  dialogs:
    defaultDialogs.map((dialog) => ({
      ...dialog,
      open: false,
      params: {},
    })) ?? [],
};

const useDialogsStore = create<DialogsState & DialogsActions>((set, get) => ({
  ...DIALOGS_INITIAL_STATE,
  openDialog: async (key, params) => {
    const dialogs = cloneDeep(get().dialogs);

    const dialogIndex = dialogs.findIndex((d) => d.key === key);
    if (dialogIndex !== -1) {
      dialogs[dialogIndex].open = true;
      dialogs[dialogIndex].params = params;
    }

    const dialogPrecheck = dialogs[dialogIndex].precheck;
    if ((await dialogPrecheck?.()) === false) {
      return;
    }

    set({ dialogs });
  },
  closeDialog: (key) => {
    const dialogs = cloneDeep(get().dialogs);

    const dialogIndex = dialogs.findIndex((d) => d.key === key);

    if (dialogIndex !== -1) {
      dialogs[dialogIndex].open = false;
      delay(() => {
        dialogs[dialogIndex].params = {};
      }, 300);
    }

    set({ dialogs });
  },
}));

// for debugging
// useDialogsStore.subscribe(console.log);

export { useDialogsStore };

export const openDialog = useDialogsStore.getState().openDialog;
export const closeDialog = useDialogsStore.getState().closeDialog;
