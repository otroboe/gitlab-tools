import { formatDate, formatTime } from '@/common';

export const generateReportFilename = (prefix: string): string => {
  const now = new Date();

  return `${prefix}_${formatDate(now)}_${formatTime(now)}`;
};
