import { createApp } from '../app/createApp.jsx';
import { createNodeRuntime } from '../runtime/node.js';
import { wrapFetch } from '../runtime/basePath.js';
import { startNodeHttpServer } from './nodeHttpServer.js';

const runtime = createNodeRuntime(process.env);
const app = createApp(runtime);
const port = Number(process.env.PORT || 8787);
const fetchHandler = wrapFetch(app.fetch.bind(app), { basePath: runtime.config.basePath });

startNodeHttpServer({ fetch: fetchHandler }, { port, logger: runtime.logger, basePath: runtime.config.basePath });
