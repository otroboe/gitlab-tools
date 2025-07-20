import { Camelize, GroupSchema, Groups } from '@gitbeaker/rest';

type Options = {
  token: string;
};

/**
 * https://docs.gitlab.com/api/groups/#list-groups
 */
export const fetchGroups = async (options: Options): Promise<Camelize<GroupSchema>[]> => {
  const { token } = options;
  const api = new Groups({
    camelize: true,
    token,
  });

  try {
    return api.all({});
  } catch (error) {
    console.log('Failed to fetch list of groups');
    return [];
  }
};
