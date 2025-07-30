import { MergeRequest, MergeRequestReviewer, makeRequest } from '@/common';
import { CoreConfig } from '@/config';

type APIMergeRequestReviewer = {
  user: {
    username: string;
  };
  state: string;
};

export const getMergeRequestReviewers = async (
  config: CoreConfig,
  mr: MergeRequest,
): Promise<MergeRequestReviewer[]> => {
  const relativeUrl = `projects/${mr.projectId}/merge_requests/${mr.iid}/reviewers`;

  const response = await makeRequest<APIMergeRequestReviewer[]>(config, { relativeUrl });

  if (!response) {
    return [];
  }

  return response.map((item) => ({
    username: item.user.username,
    state: item.state,
  }));
};
