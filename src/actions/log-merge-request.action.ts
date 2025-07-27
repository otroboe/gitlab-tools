import { Camelize, MergeRequestSchemaWithBasicLabels } from '@gitbeaker/rest';

export const logMergeRequest = (info: Camelize<MergeRequestSchemaWithBasicLabels>) => {
  const {
    author,
    blockingDiscussionsResolved,
    detailedMergeStatus,
    hasConflicts,
    iid,
    mergeStatus,
    projectId,
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
        author: author.username,
        blockingDiscussionsResolved,
        detailedMergeStatus,
        hasConflicts,
        iid,
        mergeStatus,
        projectId,
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
