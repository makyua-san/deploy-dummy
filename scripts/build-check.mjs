// Build check: fails when mode.json says "build-fail".
import { readFileSync } from 'node:fs';
const cfg = JSON.parse(readFileSync(new URL('../mode.json', import.meta.url), 'utf8'));
if (cfg.mode === 'build-fail') {
  console.error(`build failed intentionally (version ${cfg.version})`);
  process.exit(1);
}
console.log(`build ok (version ${cfg.version})`);
