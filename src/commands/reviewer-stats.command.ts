import { aggregateReviewerStats, buildReviewerStatsReport } from '@/actions';
import { Stopwatch } from '@/common';
import { CoreConfig, coreConfig } from '@/config';
import { getReviewerStats } from '@/use-cases';

const DEFAULT_DAYS = 30;

const parseDays = (): number => {
  const daysIndex = process.argv.indexOf('--days');

  if (daysIndex === -1) {
    return DEFAULT_DAYS;
  }

  const value = parseInt(process.argv[daysIndex + 1] ?? '', 10);

  return Number.isNaN(value) || value <= 0 ? DEFAULT_DAYS : value;
};

const execute = async (config: CoreConfig) => {
  const sw = new Stopwatch();
  const days = parseDays();
  const { mergeRequests, total } = await getReviewerStats(config, days);
  const stats = aggregateReviewerStats(mergeRequests);

  await buildReviewerStatsReport(config, stats, total, days);

  console.log('\n', 'Reviewer stats report generated', `in ${sw.getElapsedSeconds()} seconds`, '\n');
};

execute(coreConfig);
