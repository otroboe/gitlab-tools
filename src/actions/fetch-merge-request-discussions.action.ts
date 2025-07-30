import { Camelize, DiscussionSchema, MergeRequestDiscussions } from '@gitbeaker/rest';

import { MergeRequest } from '@/common';
import { CoreConfig } from '@/config';

export const fetchMergeRequestDiscussions = async (
  config: CoreConfig,
  mr: MergeRequest,
): Promise<Camelize<DiscussionSchema>[]> => {
  const { token } = config;
  const { iid, projectId } = mr;

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
