import { Camelize, MergeRequestSchemaWithBasicLabels } from '@gitbeaker/rest';

export const logMergeRequest = (info: Camelize<MergeRequestSchemaWithBasicLabels>) => {
  const {
    blockingDiscussionsResolved,
    detailedMergeStatus,
    hasConflicts,
    iid,
    mergeStatus,
    reviewers,
    taskCompletionStatus,
    title,
    webUrl,
  } = info;

  const reviewerNames = Array.isArray(reviewers) ? reviewers?.map(({ username }) => username) : [];

  console.log(
    JSON.stringify(
      {
        blockingDiscussionsResolved,
        detailedMergeStatus,
        hasConflicts,
        iid,
        mergeStatus,
        reviewers: reviewerNames,
        taskCompletionStatus,
        title,
        webUrl,
      },
      null,
      2,
    ),
  );
};
