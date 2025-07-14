export const getGroupId = () => {
  return parseInt(process.env.GITLAB_DEFAULT_GROUP_ID, 10);
};
