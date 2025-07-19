import { Nullable } from '@/common';

export type MergeRequest = Nullable<{
  canBeMerged: boolean;
  detailedStatus: string;
  hasChecklistDone: boolean;
  hasEnoughReviewers: boolean;
  hasNoConflicts: boolean;
  hasNoUnresolvedDiscussions: boolean;
  iid: number;
  repositoryName: string;
  title: string;
  url: string;
}>;
