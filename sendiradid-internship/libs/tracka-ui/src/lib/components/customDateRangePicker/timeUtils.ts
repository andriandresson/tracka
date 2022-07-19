export const msToString = (ms: number): string => {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor(((ms % 3600000) % 60000) / 1000);
  return `${hours}h${minutes}m`;
};

export const today = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
};

export const weekAgoDate = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
};

export const monthAgoDate = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
};

export const previousMonthStartDate = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() - 1, 1);
};
export const previousMonthEndDate = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 0);
};

export const thisMonthStartDate = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};
export const thisMonthEndDate = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0);
};
