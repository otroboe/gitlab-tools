import { getMergeRequests, parseMergeRequest } from '@/actions';
import { MarkdownBuilder, MergeRequest, formatDate, formatTime } from '@/common';
import { CoreConfig, coreConfig } from '@/config';

const generateFileName = () => {
  const now = new Date();

  return `merge-requests_${formatDate(now)}_${formatTime(now)}`;
};

const execute = async (config: CoreConfig) => {
  const { groupId, mrMinReviewers, token, reportsDirectory } = config;

  const mergeRequests = await getMergeRequests({
    groupId,
    token,
  });

  const list = mergeRequests.map((item) => parseMergeRequest(item, mrMinReviewers));

  const builder = new MarkdownBuilder({
    fileDirectory: reportsDirectory,
    fileName: generateFileName(),
  });

  list.forEach((mr: MergeRequest) => {
    builder.addListItem(`[${mr.title}](${mr.url})`);
  });

  await builder.save();
};

execute(coreConfig);
