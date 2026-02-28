import { MergeRequest, ReviewerStat } from '@/common';

export const aggregateReviewerStats = (mergeRequests: MergeRequest[]): ReviewerStat[] => {
  const statsMap = new Map<string, { totalAssigned: number; totalApproved: number }>();

  for (const mr of mergeRequests) {
    if (!mr.reviewers) {
      continue;
    }

    for (const reviewer of mr.reviewers) {
      const current = statsMap.get(reviewer.username) ?? { totalAssigned: 0, totalApproved: 0 };

      current.totalAssigned += 1;

      if (reviewer.state === 'approved') {
        current.totalApproved += 1;
      }

      statsMap.set(reviewer.username, current);
    }
  }

  return Array.from(statsMap.entries())
    .map(([username, { totalAssigned, totalApproved }]) => ({
      approvalRate: Math.round((totalApproved / totalAssigned) * 100),
      totalApproved,
      totalAssigned,
      username,
    }))
    .toSorted((a, b) => b.totalAssigned - a.totalAssigned);
};
