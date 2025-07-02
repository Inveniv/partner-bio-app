import { FC } from "react";

export const defaultDialogs: {
  key: string;
  Component: FC<any>;
  precheck?: () => Promise<boolean>;
}[] = [];
