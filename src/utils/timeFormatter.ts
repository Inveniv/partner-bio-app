export const toHHMMSS = (
  seconds: number,
  options?: {
    forceHours?: boolean;
  },
) => {
  seconds = Math.floor(seconds);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  seconds = seconds - hours * 3600 - minutes * 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  if (hours || options?.forceHours) {
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  return `${formattedMinutes}:${formattedSeconds}`;
};

export const toHHMM = (seconds: number, type?: string) => {
  seconds = Math.floor(seconds);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;

  if (type === "dots") {
    return `${formattedHours}:${formattedMinutes}`;
  } else {
    return `${formattedHours}h ${formattedMinutes}m`;
  }
};

export const toHHMMString = (seconds: number) => {
  seconds = Math.floor(seconds);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);

  return `${hours}h ${minutes}min`;
};

export const toHHMMCompressed = (seconds: number) => {
  const weekHours = 7 * 24;
  const monthHours = 30 * 24;
  const yearHours = 8760;

  const hours = Math.floor(seconds / 3600);

  if (hours < 48) {
    return toHHMM(seconds);
  } else if (hours < weekHours) {
    return "> 2d";
  } else if (hours < monthHours) {
    return "> 1w";
  } else if (hours < yearHours) {
    return "> 1m";
  } else {
    return "> 1y";
  }
};
