import { Camelize, MergeRequestSchemaWithBasicLabels, MergeRequests } from '@gitbeaker/rest';

type Options = {
  groupId: number;
  scope?: 'all' | 'created_by_me' | 'assigned_to_me';
  state?: 'opened' | 'closed' | 'locked' | 'merged';
  token: string;
  wip?: 'no';
};

/**
 * https://docs.gitlab.com/api/merge_requests/#list-merge-requests
 */
export const getMergeRequests = async (options: Options): Promise<Camelize<MergeRequestSchemaWithBasicLabels>[]> => {
  const { token, ...listOptions } = options;
  const api = new MergeRequests({
    camelize: true,
    token,
  });

  try {
    return api.all({
      scope: 'all',
      state: 'opened',
      wip: 'no',
      ...listOptions,
    });
  } catch (error) {
    console.error('\n', 'Failed to fetch list of merge requests', '\n');
    return [];
  }
};
