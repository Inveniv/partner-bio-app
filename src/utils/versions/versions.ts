import { toInteger } from "lodash";

const compareVersionsSingle = (a: string, b: string): number => {
  return toInteger(a) - toInteger(b);
};

export const compareVersions = (aVersion: string, bVersion: string): number => {
  const [aMajor = "0", aMinor = "0", aPatch = "0"] = aVersion.split(".");
  const [bMajor = "0", bMinor = "0", bPatch = "0"] = bVersion.split(".");

  // Compare major, minor, and patch versions
  return (
    [aMajor, aMinor, aPatch]
      .map((a, index) =>
        compareVersionsSingle(a, [bMajor, bMinor, bPatch][index]),
      )
      .find((result) => result !== 0) || 0
  );
};
