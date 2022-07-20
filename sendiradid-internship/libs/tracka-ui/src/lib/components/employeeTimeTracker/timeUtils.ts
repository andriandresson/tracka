export const msToString = (ms: number): string => {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor(((ms % 3600000) % 60000) / 1000);
  return `${hours}h${minutes}m`;
};

export const dateToMs = (date: Date): number => {
  return date.getTime();
};
