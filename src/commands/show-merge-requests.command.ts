import { getMergeRequests, logMergeRequest } from '@/actions';
import { CoreConfig, coreConfig } from '@/config';

const execute = async (config: CoreConfig) => {
  const { groupId, token } = config;

  const mergeRequests = await getMergeRequests({
    groupId,
    token,
  });

  mergeRequests.forEach((item) => logMergeRequest(item));
};

execute(coreConfig);
