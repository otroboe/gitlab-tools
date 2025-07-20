import { fetchGroups } from '@/actions';
import { CoreConfig, coreConfig } from '@/config';

const execute = async (config: CoreConfig) => {
  const { token } = config;

  const groups = await fetchGroups({
    token,
  });

  groups.forEach((group) => {
    console.log('\n', group.id, group.name, group.webUrl);
  });
};

execute(coreConfig);
