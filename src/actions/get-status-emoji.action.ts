export const getStatusEmoji = (value: boolean | null): string => (value === null ? '❓' : value ? '✅' : '❌');
