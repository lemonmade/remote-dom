import {spawnSync} from 'child_process';
import {fileURLToPath} from 'url';

import {version} from '../../package.json' assert {type: 'json'};

const endpoint = process.env.R2_URL!;
const accessKeyID = process.env.R2_ACCESS_KEY_ID!;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY!;

if (!endpoint || !accessKeyID || !secretAccessKey) {
  console.error(
    'You must provide `R2_URL`, `R2_ACCESS_KEY_ID`, and `R2_SECRET_ACCESS_KEY` environment variables.',
  );
  process.exit(1);
}

await run('aws', ['configure', 'set', 'region', 'us-east-1']);
await run('aws', ['configure', 'set', 'aws_access_key_id', accessKeyID]);
await run('aws', [
  'configure',
  'set',
  'aws_secret_access_key',
  secretAccessKey,
]);

const root = new URL('..', import.meta.url);
const [majorVersion, minorVersion] = version.split('.');

console.log(`Pushing assets for version ${version}…`);
await syncToR2();
await syncToR2({version: 'latest'});
await syncToR2({version: `${majorVersion}.x.x`});
await syncToR2({version: `${majorVersion}.${minorVersion}.x`});
await syncToR2({version});

async function syncToR2({version}: {version?: string} = {}) {
  const pathname = `/run${version ? `@${version}` : ''}`;

  console.log(
    `Uploading assets to ${new URL(pathname, 'https://remote-dom.io').href}…`,
  );

  const syncArgs = [
    's3',
    'sync',
    '--delete',
    fileURLToPath(new URL('./build/output/', root)),
    `s3://remote-dom-run${pathname}`,
    '--endpoint-url',
    endpoint,
  ];

  await Promise.all([
    run('aws', [
      ...syncArgs,
      '--include',
      `'element/*'`,
      '--include',
      `'environment/*'`,
      '--cache-control',
      JSON.stringify(
        version && /\d+\.\d+\.\d+/.test(version)
          ? `public, max-age=31536000, immutable`
          : `public, max-age=3600`,
      ),
    ]),
    run('aws', [
      ...syncArgs,
      '--exclude',
      `'element/*'`,
      '--exclude',
      `'environment/*'`,
      '--cache-control',
      JSON.stringify(`public, max-age=31536000, immutable`),
    ]),
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
