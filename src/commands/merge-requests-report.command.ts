import { getMergeRequests, parseMergeRequest } from '@/actions';
import { MarkdownBuilder, MergeRequest, formatDate, formatTime } from '@/common';
import { CoreConfig, coreConfig } from '@/config';

const prepareMergeRequests = async (config: CoreConfig): Promise<MergeRequest[]> => {
  const { groupId, mrMinReviewers, token } = config;

  const mergeRequests = await getMergeRequests({
    groupId,
    token,
  });

  const list = mergeRequests.map((item) => parseMergeRequest(item, mrMinReviewers));

  // Sort Alpha
  return list.toSorted((a, b) => {
    if (a.title && b.title) {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });
};

const generateFileName = () => {
  const now = new Date();

  return `merge-requests_${formatDate(now)}_${formatTime(now)}`;
};

const getEmoji = (value: boolean | null): string => {
  return !!value ? '✅' : '❌';
};

const execute = async (config: CoreConfig) => {
  const { reportsDirectory } = config;

  const list = await prepareMergeRequests(config);
  const fileName = generateFileName();

  const builder = new MarkdownBuilder({
    fileDirectory: reportsDirectory,
    fileName,
  });

  list.forEach((mr: MergeRequest) => {
    builder
      .addListItem(`[${mr.title}](${mr.url})`)
      .addNestedListItem(`\`${mr.repositoryName}\` -`)
      .addSameLineItem(`reviewers ${getEmoji(mr.hasEnoughReviewers)}`)
      .addSameLineItem(`discussions ${getEmoji(mr.hasNoUnresolvedDiscussions)}`)
      .addSameLineItem(`conflicts ${getEmoji(mr.hasNoConflicts)}`)
      .addSameLineItem(`checklist ${getEmoji(mr.hasChecklistDone)}`);
    // .addSameLineItem(`mergeable ${getEmoji(mr.canBeMerged)}`)
    // .addSameLineItem(`status \`${mr.detailedStatus}\``);
  });

  await builder.save();

  console.log('\n', `Report file generated: ${fileName}`, '\n');
};

execute(coreConfig);
