import { CategorizedMergeRequests, MergeRequest, MergeRequestCategory } from '@/common';

const initResult = (): CategorizedMergeRequests =>
  Object.values(MergeRequestCategory).reduce<CategorizedMergeRequests>((result, category) => {
    result[category] = [];
    return result;
  }, {} as CategorizedMergeRequests);

export const categorizeMergeRequests = (mergeRequests: MergeRequest[]): CategorizedMergeRequests => {
  const result = initResult();

  mergeRequests.forEach((mergeRequest) => {
    const { canBeMerged, hasEnoughReviewers, hasNoConflicts, hasNoUnresolvedDiscussions, hasSonarApproval, isRebased } =
      mergeRequest;

    // Ambiguous criteria list
    if (
      [
        canBeMerged,
        hasEnoughReviewers,
        hasNoConflicts,
        hasNoUnresolvedDiscussions,
        isRebased,
        // hasSonarApproval, Sonar can be disabled on some repositories
      ].some((criteria) => criteria === null)
    ) {
      result[MergeRequestCategory.UNKNOWN].push(mergeRequest);
      return;
    }

    if (
      [canBeMerged, hasEnoughReviewers, hasNoConflicts, hasNoUnresolvedDiscussions, hasSonarApproval, isRebased].every(
        (criteria) => criteria,
      )
    ) {
      result[MergeRequestCategory.READY_TO_REVIEW].push(mergeRequest);
      return;
    }

    result[MergeRequestCategory.NEED_ATTENTION].push(mergeRequest);
  });

  return result;
};
