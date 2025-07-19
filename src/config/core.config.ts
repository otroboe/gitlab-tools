import dotenv from 'dotenv';

dotenv.config();

export const coreConfig = {
  groupId: parseInt(process.env.GITLAB_DEFAULT_GROUP_ID, 10),
  mrMinReviewers: parseInt(process.env.MR_MIN_REVIEWERS, 10),
  token: process.env.GITLAB_TOKEN,
};
