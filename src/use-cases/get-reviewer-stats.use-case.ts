import { fetchGroupPaths, fetchMergeRequests, getMergeRequestReviewers, parseMergeRequest } from '@/actions';
import { MergeRequest } from '@/common';
import { CoreConfig } from '@/config';

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export const getReviewerStats = async (
  config: CoreConfig,
): Promise<{ mergeRequests: MergeRequest[]; total: number }> => {
  const { excludedGroupIds, groupId, mrMinReviewers, token } = config;

  const updatedAfter = new Date(Date.now() - THIRTY_DAYS_MS).toISOString();

  const [openedMrs, mergedMrs, excludedPaths] = await Promise.all([
    fetchMergeRequests({ groupId, state: 'opened', token, updatedAfter }),
    fetchMergeRequests({ groupId, state: 'merged', token, updatedAfter, wip: 'no' }),
    fetchGroupPaths({ groupIds: excludedGroupIds, token }),
  ]);

  // Deduplicate by projectId + iid
  const seen = new Set<string>();
  const allMrs = [...openedMrs, ...mergedMrs].filter((mr) => {
    const key = `${mr.projectId}-${mr.iid}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });

  // Filter out excluded groups
  const filtered =
    excludedPaths.length > 0
      ? allMrs.filter((mr) => !excludedPaths.some((path) => mr.references.full.startsWith(path)))
      : allMrs;

  // Parse MRs (we need projectId and iid for reviewer fetching)
  const parsed = filtered.map((item) => parseMergeRequest(item, mrMinReviewers));

  // Fetch reviewers for each MR
  for (const mr of parsed) {
    mr.reviewers = await getMergeRequestReviewers(config, mr);
  }

  return {
    mergeRequests: parsed,
    total: parsed.length,
  };
};
