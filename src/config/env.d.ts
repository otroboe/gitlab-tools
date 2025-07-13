declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    GITLAB_TOKEN: string;
    GITLAB_DEFAULT_GROUP_ID: string;
  }
}
