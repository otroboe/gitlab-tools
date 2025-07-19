import { getGroups } from '@/actions';
import { CoreConfig, coreConfig } from '@/config';

const execute = async (config: CoreConfig) => {
  const { token } = config;

  const groups = await getGroups({
    token,
  });

  groups.forEach((group) => {
    console.log('\n', group.id, group.name, group.webUrl);
  });
};

execute(coreConfig);
