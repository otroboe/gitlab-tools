import { fetchMergeRequests, parseMergeRequest } from '@/actions';
import { MergeRequest } from '@/common';
import { CoreConfig } from '@/config';

export const getParsedMergeRequests = async (config: CoreConfig): Promise<MergeRequest[]> => {
  const { groupId, mrMinReviewers, token } = config;

  const mergeRequests = await fetchMergeRequests({
    groupId,
    token,
  });

  const list = mergeRequests.map((item) => parseMergeRequest(item, mrMinReviewers));

  // Sort Alpha
  return list.toSorted((a, b) => {
    if (a.title && b.title) {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });
};
