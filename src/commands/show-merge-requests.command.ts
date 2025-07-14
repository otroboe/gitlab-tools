import { Camelize, MergeRequestSchemaWithBasicLabels } from '@gitbeaker/rest';

import { getGroupId, getMergeRequests } from '@/actions';

const handleMergeRequest = (info: Camelize<MergeRequestSchemaWithBasicLabels>) => {
  const {
    blockingDiscussionsResolved,
    detailedMergeStatus,
    draft,
    hasConflicts,
    iid,
    mergeStatus,
    reviewers,
    taskCompletionStatus,
    title,
    webUrl,
    workInProgress,
  } = info;

  const reviewerNames = Array.isArray(reviewers) ? reviewers?.map(({ username }) => username) : [];

  console.log(
    JSON.stringify(
      {
        blockingDiscussionsResolved,
        detailedMergeStatus,
        draft,
        hasConflicts,
        iid,
        mergeStatus,
        reviewers: reviewerNames,
        taskCompletionStatus,
        title,
        webUrl,
        workInProgress,
      },
      null,
      2,
    ),
  );
};

const execute = async () => {
  const groupId = getGroupId();
  const mergeRequests = await getMergeRequests({
    groupId,
  });

  mergeRequests.forEach((item) => {
    handleMergeRequest(item);
  });
};

execute();
