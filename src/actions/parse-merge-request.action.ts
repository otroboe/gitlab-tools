import { Camelize, MergeRequestSchemaWithBasicLabels, ReferenceSchema } from '@gitbeaker/rest';

import { MergeRequest, MergeRequestReviewer } from '@/common';

const extractRepositoryName = (references: Camelize<ReferenceSchema>): string | null => {
  const match = references.full.match(/([^/!]+)!\d+$/);

  return Array.isArray(match) && match.length >= 1 ? (match[1] ?? null) : null;
};

export const parseMergeRequest = (
  info: Camelize<MergeRequestSchemaWithBasicLabels>,
  mrMinReviewers: number,
): MergeRequest => {
  const {
    author,
    blockingDiscussionsResolved: hasNoUnresolvedDiscussions,
    detailedMergeStatus: detailedStatus,
    hasConflicts,
    iid,
    mergeStatus,
    projectId,
    references,
    reviewers: reviewerCollection,
    title,
    webUrl: url,
  } = info;

  const isRebased = (detailedStatus as string) !== 'need_rebase';
  const reviewers: MergeRequestReviewer[] = Array.isArray(reviewerCollection)
    ? reviewerCollection?.map(({ username }) => ({ username }))
    : [];
  const repositoryName = extractRepositoryName(references);

  return {
    author: author.username,
    canBeMerged: mergeStatus === 'can_be_merged',
    detailedStatus,
    hasEnoughReviewers: reviewers.length >= mrMinReviewers,
    hasNoConflicts: !hasConflicts,
    hasNoUnresolvedDiscussions,
    hasSonarApproval: null,
    iid,
    isRebased,
    projectId,
    repositoryName,
    reviewers,
    title,
    url,
  };
};
