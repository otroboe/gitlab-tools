import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const currentDirectory = process.cwd();

export type CoreConfig = {
  groupId: number;
  mrMinReviewers: number;
  reportsDirectory: string;
  token: string;
};

export const coreConfig: CoreConfig = {
  groupId: parseInt(process.env.GITLAB_DEFAULT_GROUP_ID, 10),
  mrMinReviewers: parseInt(process.env.MR_MIN_REVIEWERS, 10),
  token: process.env.GITLAB_TOKEN,
  reportsDirectory: `${currentDirectory}/reports`,
};
