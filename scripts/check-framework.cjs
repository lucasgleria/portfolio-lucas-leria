// Baseline reviewed against official release metadata on 2026-11-15.
// Recheck current advisories when changing the supported release lines.
const version = require('next/package.json').version;
const [major, minor, patch] = version.split('.').map(Number);
const minimum = { 15: [5, 29], 16: [4, 6] }[major];
const allowed = !version.includes('-') && minimum && (minor > minimum[0] || (minor === minimum[0] && patch >= minimum[1]));
if (!allowed) {
  console.error(`Release blocked: Next.js ${version} is below the reviewed security baseline (15.5.29 or 16.4.6). Install a currently patched supported release before publishing.`);
  process.exitCode = 1;
} else {
  console.log(`Next.js ${version} meets the reviewed release baseline. Recheck current advisories before publishing.`);
}
