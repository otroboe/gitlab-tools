import { fetchGroupPaths, fetchMergeRequests, parseMergeRequest } from '@/actions';
import { MergeRequest } from '@/common';
import { CoreConfig } from '@/config';

export const getParsedMergeRequests = async (config: CoreConfig): Promise<MergeRequest[]> => {
  const { excludedGroupIds, groupId, mrMinReviewers, token } = config;

  const [mergeRequests, excludedPaths] = await Promise.all([
    fetchMergeRequests({ groupId, token }),
    fetchGroupPaths({ groupIds: excludedGroupIds, token }),
  ]);

  const filtered =
    excludedPaths.length > 0
      ? mergeRequests.filter((mr) => !excludedPaths.some((path) => mr.references.full.startsWith(path)))
      : mergeRequests;

  const list = filtered.map((item) => parseMergeRequest(item, mrMinReviewers));

  // Sort Alpha
  return list.toSorted((a, b) => {
    if (a.title && b.title) {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });
};
