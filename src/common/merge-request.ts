import { Nullable } from '@/common';

export type MergeRequest = Nullable<{
  author: string;
  canBeMerged: boolean;
  detailedStatus: string;
  hasChecklistDone: boolean;
  hasEnoughReviewers: boolean;
  hasNoConflicts: boolean;
  hasNoUnresolvedDiscussions: boolean;
  hasSonarApproval: boolean;
  iid: number;
  isRebased: boolean;
  projectId: number;
  repositoryName: string;
  reviewers: string[];
  title: string;
  url: string;
}>;

export enum MergeRequestCategory {
  NEED_ATTENTION = 'NEED_ATTENTION',
  READY_TO_REVIEW = 'READY_TO_REVIEW',
  UNKNOWN = 'UNKNOWN',
}

export type CategorizedMergeRequests = Record<MergeRequestCategory, MergeRequest[]>;
