import { CoreConfig, coreConfig } from '@/config';

/**
 * Useful for manual testing
 */
const execute = async (config: CoreConfig) => {
  console.log(JSON.stringify(config, null, 2));
};

execute(coreConfig);
