import dotenv from 'dotenv';

dotenv.config();

export const gitbeakerOptions = {
  token: process.env.GITLAB_TOKEN,
};
