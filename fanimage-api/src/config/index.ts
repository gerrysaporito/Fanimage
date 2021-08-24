// File: config/index
// Description: Export of all dependencies.

import { init as initCache } from "./cache";
import { init as initDb } from "./db";
import { init as initORM } from "./orm";

const initDependencies = async () => {
  // await initCache();
  await initDb();
  await initORM();
};

export { initDependencies };
