import { fileURLToPath } from 'node:url';

import { checkDeployment } from './deployment-smoke.mjs';
import { startServer } from './server.mjs';

process.chdir(fileURLToPath(new URL('../', import.meta.url)));
const server = await startServer();
try {
  for (const result of await checkDeployment({ baseUrl: server.url })) console.log(`PASS ${result.path}`);
} finally {
  await server.close();
}
