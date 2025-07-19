import { getGroups } from '@/actions';
import { coreConfig } from '@/config';

const execute = async () => {
  const groups = await getGroups({
    token: coreConfig.token,
  });

  groups.forEach((group) => {
    console.log('\n', group.id, group.name, group.webUrl);
  });
};

execute();
