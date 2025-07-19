import { Nullable } from '@/common';

export type MergeRequest = Nullable<{
  canBeMerged: boolean;
  detailedStatus: string;
  hasChecklistDone: boolean | null;
  hasEnoughReviewers: boolean;
  hasNoConflicts: boolean;
  hasNoUnresolvedDiscussions: boolean;
  iid: number;
  title: string;
  url: string;
}>;
