import {quiltModule} from '@quilted/rollup';

const [esmoduleOptions, classicWorkerOptions, cloudflareWorkerOptions] =
  await Promise.all([
    createESModuleOptions(),
    createClassicWorkerOptions(),
    createCloudflareWorkerOptions(),
  ]);

export default [esmoduleOptions, classicWorkerOptions, cloudflareWorkerOptions];

const POLYFILL_REGEX = /@lemonmade[/]remote-ui[/].*\bpolyfill\b/;

async function createESModuleOptions() {
  const options = await quiltModule({
    entry: {
      'element/remote-dom-iframe': './source/element/remote-dom-iframe.ts',
      'element/remote-dom-worker': './source/element/remote-dom-worker.ts',
      'environment/iframe': './source/environment/iframe.ts',
      'environment/worker': './source/environment/worker.ts',
    },
    assets: {
      minify: true,
    },
  });

  options.output.manualChunks = (id, {getModuleInfo}) => {
    if (POLYFILL_REGEX.test(id)) {
      return 'polyfill';
    }

    const moduleInfo = getModuleInfo(id);

    if (moduleInfo == null) return null;

    const {isEntry, importers, exportedBindings} = moduleInfo;

    // We only want to change the chunk for shared dependencies
    if (isEntry) return null;

    // We only want to change the chunk for shared dependencies
    if (importers.length < 2) return null;

    // We don’t want to force a chunk where there are multiple exports that could
    // go in different entry chunks
    if (Object.keys(exportedBindings).length > 1) return null;

    return 'shared';
  };

  return options;
}

async function createClassicWorkerOptions() {
  const options = await quiltModule({
    entry: {
      'environment/worker-classic': './source/environment/worker-classic.ts',
    },
    assets: {
      clean: false,
      minify: true,
    },
  });

  options.output.format = 'iife';

  return options;
}

async function createCloudflareWorkerOptions() {
  const options = await quiltModule({
    entry: {
      worker: './source/server.ts',
    },
    assets: {
      clean: false,
      minify: false,
    },
  });

  options.output.dir = 'build/cloudflare';

  return options;
}
