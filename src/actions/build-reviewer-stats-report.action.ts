import { generateReportFilename } from '@/actions/generate-report-filename.action';
import { MarkdownBuilder, ReviewerStat, formatDate } from '@/common';
import { CoreConfig } from '@/config';

export const buildReviewerStatsReport = async (config: CoreConfig, stats: ReviewerStat[], totalMrs: number) => {
  const { reportsDirectory } = config;
  const fileName = generateReportFilename('reviewer-stats');

  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const builder = new MarkdownBuilder({
    fileDirectory: reportsDirectory,
    fileName,
  });

  builder
    .addTitle('Reviewer Statistics — Past 30 days', 1)
    .addListItem(`**Period:** ${formatDate(thirtyDaysAgo)} → ${formatDate(now)}`)
    .addListItem(`**Total MRs analyzed:** ${totalMrs}`);

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
