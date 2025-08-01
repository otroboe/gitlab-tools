import { MarkdownBuilder, MergeRequest } from '@/common';

export const addReviewersToReport = (builder: MarkdownBuilder, mr: MergeRequest) => {
  const { reviewers } = mr;

  if (!Array.isArray(reviewers) || reviewers.length === 0) {
    return;
  }

  builder.addNestedListItem('Missing review from:');

  reviewers?.forEach((reviewer) => {
    if (reviewer.state === 'unreviewed') {
      builder.addSameLineItem(`- \`${reviewer.username}\``);
    }
  });
};
