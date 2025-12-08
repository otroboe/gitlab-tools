import { loadEnvFile } from 'node:process';

loadEnvFile();

const currentDirectory = process.cwd();

export type CoreConfig = {
  baseApiUrl: string;
  groupId: number;
  mrMinReviewers: number;
  reportsDirectory: string;
  token: string;
};

export const coreConfig: CoreConfig = {
  baseApiUrl: 'https://gitlab.com/api/v4',
  groupId: parseInt(process.env.GITLAB_DEFAULT_GROUP_ID, 10),
  mrMinReviewers: parseInt(process.env.MR_MIN_REVIEWERS, 10),
  reportsDirectory: `${currentDirectory}/reports`,
  token: process.env.GITLAB_TOKEN,
};
