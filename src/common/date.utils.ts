export const formatTime = (date: Date, options: Intl.DateTimeFormatOptions = {}) =>
  date.toLocaleTimeString('en-ca', {
    hour: '2-digit',
    hourCycle: 'h24',
    minute: '2-digit',
    second: '2-digit',
    ...options,
  });

export const formatDate = (date: Date, options: Intl.DateTimeFormatOptions = {}) =>
  date.toLocaleDateString('en-ca', {
    ...options,
  });
