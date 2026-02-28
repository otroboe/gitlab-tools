import { fetchMergeRequests, getMergeRequestReviewers, parseMergeRequest } from '@/actions';
import { MergeRequest } from '@/common';
import { CoreConfig } from '@/config';

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const CONCURRENCY = 10;

export const getReviewerStats = async (
  config: CoreConfig,
): Promise<{ mergeRequests: MergeRequest[]; total: number }> => {
  const { groupId, mrMinReviewers, token } = config;

  const updatedAfter = new Date(Date.now() - THIRTY_DAYS_MS).toISOString();

  const mergedMrs = await fetchMergeRequests({ groupId, state: 'merged', token, updatedAfter, wip: 'no' });

  const parsed = mergedMrs.map((item) => parseMergeRequest(item, mrMinReviewers));

  // Fetch reviewers in batches for performance
  for (let i = 0; i < parsed.length; i += CONCURRENCY) {
    const batch = parsed.slice(i, i + CONCURRENCY);
    const results = await Promise.all(batch.map((mr) => getMergeRequestReviewers(config, mr)));

    batch.forEach((mr, index) => {
      mr.reviewers = results[index] ?? [];
    });
  }

  return {
    mergeRequests: parsed,
    total: parsed.length,
  };
};
