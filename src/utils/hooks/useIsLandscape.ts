import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export function useIsLandscape() {
  const [isLandscape, setIsLandscape] = useState<boolean>(
    Dimensions.get("window").width > Dimensions.get("window").height,
  );

  useEffect(() => {
    Dimensions.addEventListener("change", ({ window: { width, height } }) => {
      setIsLandscape(width > height);
    });
  }, []);

  return isLandscape;
}
