import { addMergeRequestInfoToReport, addReviewersToReport, generateReportFilename, getStatusEmoji } from '@/actions';
import { CategorizedMergeRequests, MarkdownBuilder, MergeRequest, MergeRequestCategory } from '@/common';
import { CoreConfig } from '@/config';

const writeReadyToReviewSection = (builder: MarkdownBuilder, list: MergeRequest[], isDebug = false) => {
  if (list.length === 0) {
    return;
  }

  builder.addBoldItalicTitle('Ready to Review');

  list.forEach((mr) => {
    if (isDebug) {
      addMergeRequestInfoToReport(builder, mr);
      return;
    }

    builder.addListItem(`[${mr.title}](${mr.url})`);
    addReviewersToReport(builder, mr);
  });
};

const writeNeedAttentionSection = (builder: MarkdownBuilder, list: MergeRequest[], isDebug = false) => {
  if (list.length === 0) {
    return;
  }

  builder.addBoldItalicTitle('Need Attention');

  list.forEach((mr) => {
    if (isDebug) {
      addMergeRequestInfoToReport(builder, mr);
      addReviewersToReport(builder, mr);
      return;
    }

    builder.addListItem(`[${mr.title}](${mr.url})`).addNestedListItem(`From \`${mr.author}\` -`);

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

    if (mr.isRebased === false) {
      builder.addSameLineItem(`rebased ${getStatusEmoji(mr.isRebased)}`);
    }
  });
};

/**
 * Should not happen, so we display everything we know about the MR
 */
const writeNeedUnknownSection = (builder: MarkdownBuilder, list: MergeRequest[], isDebug = false) => {
  if (list.length === 0) {
    return;
  }

  builder.addBoldItalicTitle('Not enough info');

  list.forEach((mr) => {
    addMergeRequestInfoToReport(builder, mr);

    if (isDebug) {
      addReviewersToReport(builder, mr);
    }
  });
};

export const buildMergeRequestReport = async (config: CoreConfig, list: CategorizedMergeRequests, isDebug = false) => {
  const { reportsDirectory } = config;
  const fileName = generateReportFilename('merge-requests');

  const builder = new MarkdownBuilder({
    fileDirectory: reportsDirectory,
    fileName,
  });

  writeReadyToReviewSection(builder, list[MergeRequestCategory.READY_TO_REVIEW], isDebug);
  writeNeedAttentionSection(builder, list[MergeRequestCategory.NEED_ATTENTION], isDebug);
  writeNeedUnknownSection(builder, list[MergeRequestCategory.UNKNOWN], isDebug);

  await builder.save();
};
