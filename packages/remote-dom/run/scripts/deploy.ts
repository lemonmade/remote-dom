import {spawnSync} from 'child_process';
import {fileURLToPath} from 'url';

import {version} from '../../package.json' assert {type: 'json'};

// console.log(version);

const root = new URL('..', import.meta.url);

const minorVersion = version.split('.').slice(0, 2).join('.');

await syncToR2({version: minorVersion});

async function syncToR2({version}: {version?: string}) {
  const cacheControl =
    version && version.split('.').length === 3
      ? 'public, max-age=31536000, immutable'
      : 'no-cache';

  await run('aws', [
    's3',
    'sync',
    fileURLToPath(new URL('./build/assets/', root)),
    `s3://remote-dom-run/run${version ? `@${version}` : ''}`,
    '--endpoint-url',
    process.env.R2_URL!,
    '--cache-control',
    JSON.stringify(cacheControl),
  ]);
}

async function run(command: string, args?: string[]) {
  const {status} = spawnSync(command, args, {
    stdio: 'inherit',
    shell: true,
  });

  if (status !== 0) {
    process.exit(status ?? 1);
  }
}
