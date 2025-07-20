import { generateReportFilename, getStatusEmoji } from '@/actions';
import { MarkdownBuilder, MergeRequest, Stopwatch } from '@/common';
import { CoreConfig, coreConfig } from '@/config';
import { getMergeRequestSonarStatus, getParsedMergeRequests } from '@/use-cases';

const execute = async (config: CoreConfig) => {
  const sw = new Stopwatch();
  const { reportsDirectory, token } = config;

  const list = await getParsedMergeRequests(config);

  for (const mergeRequest of list) {
    mergeRequest.hasSonarApproval = await getMergeRequestSonarStatus({ token, mergeRequest });
  }

  const fileName = generateReportFilename('merge-requests');

  const builder = new MarkdownBuilder({
    fileDirectory: reportsDirectory,
    fileName,
  });

  list.forEach((mr: MergeRequest) => {
    builder
      .addListItem(`[${mr.title}](${mr.url})`)
      .addNestedListItem(`\`${mr.repositoryName}\` -`)
      .addSameLineItem(`reviewers ${getStatusEmoji(mr.hasEnoughReviewers)}`)
      .addSameLineItem(`discussions ${getStatusEmoji(mr.hasNoUnresolvedDiscussions)}`)
      .addSameLineItem(`sonar ${getStatusEmoji(mr.hasSonarApproval)}`)
      .addSameLineItem(`conflicts ${getStatusEmoji(mr.hasNoConflicts)}`)
      .addSameLineItem(`checklist ${getStatusEmoji(mr.hasChecklistDone)}`);
    // .addSameLineItem(`mergeable ${getStatusEmoji(mr.canBeMerged)}`)
    // .addSameLineItem(`status \`${mr.detailedStatus}\``);
  });

  await builder.save();

  console.log('\n', 'Report file generated', `in ${sw.getElapsedSeconds()} seconds`, '\n');
};

execute(coreConfig);
