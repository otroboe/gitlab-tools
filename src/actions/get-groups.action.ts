import { Camelize, GroupSchema, Groups } from '@gitbeaker/rest';

import { gitbeakerOptions } from '@/config';

/**
 * https://docs.gitlab.com/api/groups/#list-groups
 */
export const getGroups = async (): Promise<Camelize<GroupSchema>[]> => {
  const api = new Groups({
    ...gitbeakerOptions,
    camelize: true,
  });

  try {
    return api.all({});
  } catch (error) {
    console.log('Failed to fetch list of groups');
    return [];
  }
};
