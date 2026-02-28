import { aggregateReviewerStats, buildReviewerStatsReport } from '@/actions';
import { Stopwatch } from '@/common';
import { CoreConfig, coreConfig } from '@/config';
import { getReviewerStats } from '@/use-cases';

const execute = async (config: CoreConfig) => {
  const sw = new Stopwatch();
  const { mergeRequests, total } = await getReviewerStats(config);
  const stats = aggregateReviewerStats(mergeRequests);

  await buildReviewerStatsReport(config, stats, total);

  console.log('\n', 'Reviewer stats report generated', `in ${sw.getElapsedSeconds()} seconds`, '\n');
};

execute(coreConfig);
