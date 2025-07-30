import * as fs from 'fs/promises';
import path from 'path';

import { CoreConfig, coreConfig } from '@/config';

const execute = async (config: CoreConfig) => {
  const { reportsDirectory } = config;

  for (const file of await fs.readdir(reportsDirectory)) {
    await fs.unlink(path.join(reportsDirectory, file));
  }
};

execute(coreConfig);
