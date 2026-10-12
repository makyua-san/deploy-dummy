# deploy-dummy

Tiny dependency-free Node HTTP server used to verify the platform's pull-based deploy,
rollback and automatic recovery. It stores no data and writes no files.

- `npm run build` — fails only when `mode.json` has `"mode": "build-fail"`
- `node server.mjs --port <n>` — `/health` returns 200 (`503` when mode is `health-503`);
  exits before listening when mode is `exit-early`
