import {quiltModule} from '@quilted/rollup';

const [esmoduleOptions, classicWorkerOptions] = await Promise.all([
  createESModuleOptions(),
  createClassicWorkerOptions(),
]);

export default [esmoduleOptions, classicWorkerOptions];

async function createESModuleOptions() {
  const options = await quiltModule({
    entry: {
      'element/remote-dom-iframe': './source/element/remote-dom-iframe.ts',
      'element/remote-dom-worker': './source/element/remote-dom-worker.ts',
      'environment/iframe': './source/environment/iframe.ts',
      'environment/worker': './source/environment/worker.ts',
    },
    assets: {
      minify: false,
    },
  });

  options.output.manualChunks = (id, {getModuleInfo}) => {
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
      minify: false,
      clean: false,
    },
  });

  options.output.format = 'iife';

  return options;
}
