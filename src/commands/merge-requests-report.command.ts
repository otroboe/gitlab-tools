import { categorizeMergeRequests, getMergeRequestReviewers, isDebug } from '@/actions';
import { Stopwatch } from '@/common';
import { CoreConfig, coreConfig } from '@/config';
import { buildMergeRequestReport, getMergeRequestSonarStatus, getParsedMergeRequests } from '@/use-cases';

const execute = async (config: CoreConfig) => {
  const sw = new Stopwatch();
  const debug = isDebug();
  const list = await getParsedMergeRequests(config);

  for (const mr of list) {
    mr.hasSonarApproval = await getMergeRequestSonarStatus(config, mr);
    mr.reviewers = await getMergeRequestReviewers(config, mr);
  }

  const categorized = categorizeMergeRequests(list);

  await buildMergeRequestReport(config, categorized, debug);

  console.log('\n', 'Report file generated', `in ${sw.getElapsedSeconds()} seconds`, '\n');
};

execute(coreConfig);
