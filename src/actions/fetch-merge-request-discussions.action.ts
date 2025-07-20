import { Camelize, DiscussionSchema, MergeRequestDiscussions } from '@gitbeaker/rest';

import { MergeRequest } from '@/common';

type Options = {
  token: string;
  mergeRequest: MergeRequest;
};

export const fetchMergeRequestDiscussions = async (options: Options): Promise<Camelize<DiscussionSchema>[]> => {
  const {
    token,
    mergeRequest: { iid, projectId },
  } = options;

  if (!token || !projectId || !iid) {
    console.error('🚨', 'Invalid options provided for fetching merge request discussions', '\n');
    return [];
  }

  const api = new MergeRequestDiscussions({
    camelize: true,
    token,
  });

  try {
    return await api.all(projectId, iid);
  } catch (error) {
    console.error('💥', 'Failed to fetch list MR discussions', '\n');
    return [];
  }
};
