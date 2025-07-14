import { Camelize, MergeRequestSchemaWithBasicLabels, MergeRequests } from '@gitbeaker/rest';

import { gitbeakerOptions } from '@/config';

type GetMergeRequestsOptions = {
  groupId: number;
  scope?: 'all' | 'created_by_me' | 'assigned_to_me';
  state?: 'opened' | 'closed' | 'locked' | 'merged';
  wip?: 'no';
};

/**
 * https://docs.gitlab.com/api/merge_requests/#list-merge-requests
 */
export const getMergeRequests = async (
  options: GetMergeRequestsOptions,
): Promise<Camelize<MergeRequestSchemaWithBasicLabels>[]> => {
  const api = new MergeRequests({
    ...gitbeakerOptions,
    camelize: true,
  });

  try {
    return api.all({
      scope: 'all',
      state: 'opened',
      wip: 'no',
      ...options,
    });
  } catch (error) {
    console.log('Failed to fetch list of merge requests');
    return [];
  }
};
