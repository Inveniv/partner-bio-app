import { delay, uniqueId } from "lodash";
import { Snackbar } from "react-native-paper";
import { create } from "zustand";

type Snackbar = {
  key: string;
  type: "info" | "success" | "error" | "warning";
  title: string;
  visible: boolean;
};

export const SNACKBAR_DURATION = 2_000;
export const SNACKBAR_ANIMATION_DURATION = 500;

type SnackbarState = {
  snackbars: Snackbar[];
};

type SnackbarActions = {
  showSnackbar: (snackbar: Omit<Snackbar, "key" | "visible">) => void;
  closeSnackbar: (key: string) => void;
};

const SNACKBAR_INITIAL_STATE: SnackbarState = {
  snackbars: [],
};

const useSnackbarStore = create<SnackbarState & SnackbarActions>(
  (set, get) => ({
    ...SNACKBAR_INITIAL_STATE,
    showSnackbar: (_snackbar) => {
      const key = uniqueId();
      const snackbar: Snackbar = {
        ..._snackbar,
        key,
        visible: true,
      };

      set({
        snackbars: [...get().snackbars, snackbar],
      });

      delay(() => {
        set({
          snackbars: get().snackbars.map((s) =>
            s.key === snackbar.key ? { ...s, visible: false } : s,
          ),
        });

        delay(() => {
          set({
            snackbars: get().snackbars.filter((s) => s.key !== snackbar.key),
          });
        }, SNACKBAR_ANIMATION_DURATION);
      }, SNACKBAR_DURATION);
    },
    closeSnackbar: (key) => {
      console.log("TODO: closeSnackbar", key);
    },
  }),
);

// for debugging
// useSnackbarStore.subscribe(console.log);

export const showSnackbar = useSnackbarStore.getState().showSnackbar;

export { useSnackbarStore };
