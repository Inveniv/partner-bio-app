import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { createRef, ForwardRefExoticComponent, RefObject } from "react";
import { create } from "zustand";

import { bottomsSheets } from "./sheets";

type SheetsState = {
  sheets: {
    key: string;
    Component: ForwardRefExoticComponent<any>;
    precheck?: () => Promise<boolean>;
    ref: RefObject<BottomSheetModal>;
  }[];
  inputFocused: boolean;
  dismissable: boolean;
};

type SheetsActions = {
  openSheet: (key: string, props?: any) => void;
  setInputFocused: (inputFocused: boolean) => void;
  setDismissable: (dismissable: boolean) => void;
};

const SHEETS_INITIAL_STATE: SheetsState = {
  sheets: bottomsSheets.map((props) => ({
    ...props,
    ref: createRef<BottomSheetModal>(),
  })),
  inputFocused: false,
  dismissable: true,
};

const useSheetsStore = create<SheetsState & SheetsActions>((set, get) => ({
  ...SHEETS_INITIAL_STATE,
  openSheet: async (key, props) => {
    const sheet = get().sheets.find((s) => s.key === key);

    const sheetPrecheck = sheet?.precheck;
    if ((await sheetPrecheck?.()) === false) {
      return;
    }

    sheet?.ref.current?.present(props);
  },
  setInputFocused: (inputFocused) => {
    set({ inputFocused });
  },
  setDismissable: (dismissable) => {
    set({ dismissable });
  },
}));

// for debugging
// useSheetsStore.subscribe(console.log);

export { useSheetsStore };

export const openSheet = useSheetsStore.getState().openSheet;
