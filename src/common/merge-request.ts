import { Nullable } from '@/common';

export type MergeRequestReviewer = {
  username: string;
  state?: string;
};

export type MergeRequest = Nullable<{
  author: string;
  canBeMerged: boolean;
  detailedStatus: string;
  hasEnoughReviewers: boolean;
  hasNoConflicts: boolean;
  hasNoUnresolvedDiscussions: boolean;
  hasSonarApproval: boolean;
  iid: number;
  isRebased: boolean;
  projectId: number;
  repositoryName: string;
  reviewers: MergeRequestReviewer[];
  title: string;
  url: string;
}>;

export enum MergeRequestCategory {
  NEED_ATTENTION = 'NEED_ATTENTION',
  READY_TO_REVIEW = 'READY_TO_REVIEW',
  UNKNOWN = 'UNKNOWN',
}

export type CategorizedMergeRequests = Record<MergeRequestCategory, MergeRequest[]>;

export type ReviewerStat = {
  approvalRate: number;
  totalApproved: number;
  totalAssigned: number;
  username: string;
};
