import { Camelize, MergeRequestSchemaWithBasicLabels } from '@gitbeaker/rest';

import { getMergeRequests } from '@/actions';
import { MergeRequest } from '@/common';
import { coreConfig } from '@/config';

const handleMergeRequest = (
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

const execute = async () => {
  const { groupId, mrMinReviewers, token } = coreConfig;

  const mergeRequests = await getMergeRequests({
    groupId,
    token,
  });

  const list = mergeRequests.map((item) => handleMergeRequest(item, mrMinReviewers));

  console.log(JSON.stringify({ list }, null, 2));
};

execute();
