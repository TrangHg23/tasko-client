import { isBefore, parseISO } from 'date-fns';

const APP_TIME_ZONE = 'Asia/Ho_Chi_Minh';

export const formatVnTime = (iso: string) => {
  return new Date(iso).toLocaleString('vi-VN', {
    timeZone: APP_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export const isTaskExpired = (dueDateTime?: string) => {
  if (!dueDateTime) return false;

  const due = parseISO(dueDateTime);
  const now = new Date();

  return isBefore(due, now);
};
