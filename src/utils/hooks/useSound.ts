import { useEffect, useRef } from "react";
import Sound from "react-native-sound";

Sound.setActive(true);
Sound.setCategory("Playback", true);

export function useSound(file: NodeRequire) {
  const soundRef = useRef<Sound | null>(null);

  useEffect(() => {
    soundRef.current = new Sound(file, (error) => {
      if (error) {
        console.log("failed to load the sound", error);
        return;
      }

      soundRef.current?.setVolume(1);
      soundRef.current?.setPan(1);
      soundRef.current?.setNumberOfLoops(-1);

      soundRef.current?.play();
    });

    return () => {
      soundRef.current?.stop();
    };
  }, [file]);

  return {};
}

export function playSound(file: NodeRequire) {
  const sound = new Sound(file, (error) => {
    if (error) {
      console.log("failed to load the sound", error);
      return;
    }

    sound.setVolume(1);
    sound.setPan(1);
    sound.setNumberOfLoops(0);

    sound.play();
  });
}
