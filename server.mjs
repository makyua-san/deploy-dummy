// Minimal HTTP server. Usage: node server.mjs --port <n>
// Behaviour is selected by mode.json: ok | build-fail | exit-early | health-503
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

const cfg = JSON.parse(readFileSync(new URL('./mode.json', import.meta.url), 'utf8'));
const i = process.argv.indexOf('--port');
const port = Number(i >= 0 ? process.argv[i + 1] : process.env.PORT);
if (!Number.isInteger(port) || port <= 0) {
  console.error('port is required (--port <n> or PORT)');
  process.exit(2);
}
if (cfg.mode === 'exit-early') {
  console.error(`exiting before listen intentionally (version ${cfg.version})`);
  process.exit(1);
}

const server = createServer((req, res) => {
  const body = { app: 'deploy-dummy', version: cfg.version, mode: cfg.mode };
  if (req.url === '/health') {
    const ok = cfg.mode !== 'health-503';
    res.writeHead(ok ? 200 : 503, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ...body, healthy: ok }));
    return;
  }
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify(body));
});
server.listen(port, '127.0.0.1', () => {
  console.log(`deploy-dummy ${cfg.version} listening on loopback:${port}`);
});
