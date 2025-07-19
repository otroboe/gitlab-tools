import { Camelize, MergeRequestSchemaWithBasicLabels } from '@gitbeaker/rest';

export const logMergeRequest = (info: Camelize<MergeRequestSchemaWithBasicLabels>) => {
  const {
    blockingDiscussionsResolved,
    detailedMergeStatus,
    hasConflicts,
    iid,
    mergeStatus,
    references,
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
        references,
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
