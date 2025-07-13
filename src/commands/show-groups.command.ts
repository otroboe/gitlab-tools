import { getGroups } from '@/actions';

const execute = async () => {
  const groups = await getGroups();

  groups.forEach((group) => {
    console.log('\n', group.id, group.name, group.webUrl);
  });
};

execute();
