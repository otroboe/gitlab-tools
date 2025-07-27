import { categorizeMergeRequests } from '@/actions';
import { Stopwatch } from '@/common';
import { CoreConfig, coreConfig } from '@/config';
import { buildMergeRequestReport, getMergeRequestSonarStatus, getParsedMergeRequests } from '@/use-cases';

const execute = async (config: CoreConfig) => {
  const sw = new Stopwatch();
  const { token } = config;

  const list = await getParsedMergeRequests(config);

  for (const mergeRequest of list) {
    mergeRequest.hasSonarApproval = await getMergeRequestSonarStatus({ token, mergeRequest });
  }

  const categorized = categorizeMergeRequests(list);

  await buildMergeRequestReport(config, categorized);

  console.log('\n', 'Report file generated', `in ${sw.getElapsedSeconds()} seconds`, '\n');
};

execute(coreConfig);
