/**
 * For now, assuming it's the first argument in the command
 */
export const isDebug = (argumentValue = '--debug') => {
  const [, , firstArgument] = process.argv;

  return firstArgument === argumentValue;
};
