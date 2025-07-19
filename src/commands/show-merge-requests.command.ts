import { Camelize, MergeRequestSchemaWithBasicLabels } from '@gitbeaker/rest';

import { getMergeRequests } from '@/actions';
import { coreConfig } from '@/config';

const handleMergeRequest = (info: Camelize<MergeRequestSchemaWithBasicLabels>) => {
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

const execute = async () => {
  const { groupId, token } = coreConfig;

  const mergeRequests = await getMergeRequests({
    groupId,
    token,
  });

  mergeRequests.forEach((item) => {
    handleMergeRequest(item);
  });
};

execute();
