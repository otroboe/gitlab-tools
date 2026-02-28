import { getStatusEmoji } from '@/actions/get-status-emoji.action';
import { MarkdownBuilder, MergeRequest } from '@/common';

/**
 * Mostly for debugging, we want to print the most info we have
 */
export const addMergeRequestInfoToReport = (builder: MarkdownBuilder, mr: MergeRequest): void => {
  builder
    .addListItem(`[${mr.title}](${mr.url})`)
    .addNestedListItem(`\`${mr.repositoryName}\` -`)
    .addSameLineItem(`from \`${mr.author}\` -`)
    .addSameLineItem(`reviewers ${getStatusEmoji(mr.hasEnoughReviewers)}`)
    .addSameLineItem(`discussions ${getStatusEmoji(mr.hasNoUnresolvedDiscussions)}`)
    .addSameLineItem(`sonar ${getStatusEmoji(mr.hasSonarApproval)}`)
    .addSameLineItem(`conflicts ${getStatusEmoji(mr.hasNoConflicts)}`)
    .addSameLineItem(`rebased ${getStatusEmoji(mr.isRebased)}`)
    .addSameLineItem(`mergeable ${getStatusEmoji(mr.canBeMerged)}`)
    .addSameLineItem(`status \`${mr.detailedStatus}\``);
};
