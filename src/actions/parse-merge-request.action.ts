import { Camelize, MergeRequestSchemaWithBasicLabels } from '@gitbeaker/rest';

import { MergeRequest } from '@/common';

export const parseMergeRequest = (
  info: Camelize<MergeRequestSchemaWithBasicLabels>,
  mrMinReviewers: number,
): MergeRequest => {
  const {
    blockingDiscussionsResolved: hasNoUnresolvedDiscussions,
    detailedMergeStatus: detailedStatus,
    hasConflicts,
    iid,
    mergeStatus,
    reviewers,
    taskCompletionStatus,
    title,
    webUrl: url,
  } = info;

  const hasChecklistDone = taskCompletionStatus
    ? taskCompletionStatus?.completedCount === taskCompletionStatus?.count
    : null;
  const hasEnoughReviewers = Array.isArray(reviewers) ? reviewers.length >= mrMinReviewers : false;

  return {
    canBeMerged: mergeStatus === 'can_be_merged',
    detailedStatus,
    hasChecklistDone,
    hasEnoughReviewers,
    hasNoConflicts: !hasConflicts,
    hasNoUnresolvedDiscussions,
    iid,
    title,
    url,
  };
};
