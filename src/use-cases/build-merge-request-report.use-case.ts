import { addMergeRequestInfoToReport, generateReportFilename, getStatusEmoji } from '@/actions';
import { CategorizedMergeRequests, MarkdownBuilder, MergeRequest, MergeRequestCategory } from '@/common';
import { CoreConfig } from '@/config';

const writeReadyToReviewSection = (builder: MarkdownBuilder, list: MergeRequest[]) => {
  if (list.length === 0) {
    return;
  }

  builder.addTitle('Ready to Review');

  list.forEach((mr) => {
    // addMergeRequestInfoToReport(builder, mr);
    builder.addListItem(`[${mr.title}](${mr.url})`);

    // TODO - Add reviewers who didn't review
  });
};

const writeNeedAttentionSection = (builder: MarkdownBuilder, list: MergeRequest[]) => {
  if (list.length === 0) {
    return;
  }

  builder.addTitle('Need Attention');

  list.forEach((mr) => {
    builder.addListItem(`[${mr.title}](${mr.url})`).addNestedListItem(`\`${mr.author}\` -`);

    if (mr.hasEnoughReviewers === false) {
      builder.addSameLineItem(`reviewers ${getStatusEmoji(mr.hasEnoughReviewers)}`);
    }

    if (mr.hasNoUnresolvedDiscussions === false) {
      builder.addSameLineItem(`discussions ${getStatusEmoji(mr.hasNoUnresolvedDiscussions)}`);
    }

    if (mr.hasSonarApproval === false) {
      builder.addSameLineItem(`sonar ${getStatusEmoji(mr.hasSonarApproval)}`);
    }

    if (mr.hasNoConflicts === false) {
      builder.addSameLineItem(`conflicts ${getStatusEmoji(mr.hasNoConflicts)}`);
    }

    if (mr.hasChecklistDone === false) {
      builder.addSameLineItem(`checklist ${getStatusEmoji(mr.hasChecklistDone)}`);
    }

    if (mr.isRebased === false) {
      builder.addSameLineItem(`rebased ${getStatusEmoji(mr.isRebased)}`);
    }

    // TOD0 - Add author
  });
};

/**
 * Should not happen, so we display everything we know about the MR
 */
const writeNeedUnknownSection = (builder: MarkdownBuilder, list: MergeRequest[]) => {
  if (list.length === 0) {
    return;
  }

  builder.addTitle('Not enough info');

  list.forEach((mr) => {
    addMergeRequestInfoToReport(builder, mr);
  });
};

export const buildMergeRequestReport = async (config: CoreConfig, list: CategorizedMergeRequests) => {
  const { reportsDirectory } = config;
  const fileName = generateReportFilename('merge-requests');

  const builder = new MarkdownBuilder({
    fileDirectory: reportsDirectory,
    fileName,
  });

  writeReadyToReviewSection(builder, list[MergeRequestCategory.READY_TO_REVIEW]);
  writeNeedAttentionSection(builder, list[MergeRequestCategory.NEED_ATTENTION]);
  writeNeedUnknownSection(builder, list[MergeRequestCategory.UNKNOWN]);

  await builder.save();
};
