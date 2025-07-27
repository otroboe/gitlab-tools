import { addMergeRequestInfoToReport, generateReportFilename } from '@/actions';
import { CategorizedMergeRequests, MarkdownBuilder, MergeRequest, MergeRequestCategory } from '@/common';
import { CoreConfig } from '@/config';

const writeReadyToReviewSection = (builder: MarkdownBuilder, list: MergeRequest[]) => {
  if (list.length === 0) {
    return;
  }

  builder.addTitle('Ready to Review');

  list.forEach((mr) => {
    addMergeRequestInfoToReport(builder, mr);
  });
};

const writeNeedAttentionSection = (builder: MarkdownBuilder, list: MergeRequest[]) => {
  if (list.length === 0) {
    return;
  }

  builder.addTitle('Need Attention');

  list.forEach((mr) => {
    addMergeRequestInfoToReport(builder, mr);
  });
};

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
