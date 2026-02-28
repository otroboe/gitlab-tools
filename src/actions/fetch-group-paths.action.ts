import { Groups } from '@gitbeaker/rest';

type Options = {
  groupIds: number[];
  token: string;
};

/**
 * Resolves a list of group IDs to their full paths via the Groups API.
 * https://docs.gitlab.com/api/groups/#details-of-a-group
 */
export const fetchGroupPaths = async (options: Options): Promise<string[]> => {
  const { groupIds, token } = options;

  if (groupIds.length === 0) {
    return [];
  }

  const api = new Groups({
    camelize: true,
    token,
  });

  try {
    const groups = await Promise.all(groupIds.map((id) => api.show(id)));

    return groups.map((group) => group.fullPath);
  } catch (error) {
    console.error('\n', 'Failed to fetch group paths for excluded groups', '\n');
    return [];
  }
};
