import { Camelize, MergeRequestSchemaWithBasicLabels, ReferenceSchema } from '@gitbeaker/rest';

import { MergeRequest } from '@/common';

const extractRepositoryName = (references: Camelize<ReferenceSchema>): string | null => {
  const match = references.full.match(/([^/!]+)!\d+$/);

  return Array.isArray(match) && match.length >= 1 ? (match[1] ?? null) : null;
};

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
    references,
    reviewers,
    taskCompletionStatus,
    title,
    webUrl: url,
  } = info;

  const hasChecklistDone = taskCompletionStatus
    ? taskCompletionStatus?.completedCount === taskCompletionStatus?.count
    : null;
  const hasEnoughReviewers = Array.isArray(reviewers) ? reviewers.length >= mrMinReviewers : false;
  const repositoryName = extractRepositoryName(references);

  return {
    canBeMerged: mergeStatus === 'can_be_merged',
    detailedStatus,
    hasChecklistDone,
    hasEnoughReviewers,
    hasNoConflicts: !hasConflicts,
    hasNoUnresolvedDiscussions,
    iid,
    repositoryName,
    title,
    url,
  };
};
