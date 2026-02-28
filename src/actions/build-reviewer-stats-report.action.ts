import { generateReportFilename } from '@/actions/generate-report-filename.action';
import { MarkdownBuilder, ReviewerStat, formatDate } from '@/common';
import { CoreConfig } from '@/config';

export const buildReviewerStatsReport = async (
  config: CoreConfig,
  stats: ReviewerStat[],
  totalMrs: number,
  days: number,
) => {
  const { reportsDirectory } = config;
  const fileName = generateReportFilename('reviewer-stats');

  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - days);

  const builder = new MarkdownBuilder({
    fileDirectory: reportsDirectory,
    fileName,
  });

  builder
    .addTitle(`Reviewer Statistics — Past ${days} days`, 1)
    .addListItem(`**Period:** ${formatDate(startDate)} → ${formatDate(now)}`)
    .addListItem(`**Total merged MRs analyzed:** ${totalMrs}`);

  if (stats.length === 0) {
    builder.addListItem('No reviewer data found.');
    await builder.save();
    return;
  }

  builder.addTable(
    ['Reviewer', 'Assigned', 'Approved', 'Rate'],
    stats.map((s) => [s.username, String(s.totalAssigned), String(s.totalApproved), `${s.approvalRate}%`]),
  );

  await builder.save();
};
