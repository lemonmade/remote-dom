import '@lemonmade/remote-ui/polyfill';

import {retain, createThreadFromWebWorker} from '@quilted/threads';
import {RemoteRootElement} from '@lemonmade/remote-ui/elements';

import type {Renderer} from '../types.ts';

export interface WorkerEnvironmentOptions {}

declare global {
  interface HTMLElementTagNameMap {
    'remote-root': InstanceType<typeof RemoteRootElement>;
  }
}

// This is identical to the module-friendly worker.ts sibling file, but in order
// to support usage in classic workers, is not asynchronous. This allows it to be
// used at the top level of a worker script, so it would work correctly when bundled
// into an IIFE or imported using `importScripts()`.
export function createWorkerEnvironment(_: WorkerEnvironmentOptions = {}) {
  const thread = createThreadFromWebWorker<{}, Renderer>(self as any);

  if (customElements.get('remote-root') == null) {
    customElements.define('remote-root', RemoteRootElement);
  }

  const element = document.createElement('remote-root');

  thread
    .accept((callback) => {
      retain(callback);
      element.connect(callback);
    })
    .catch(() => {
      // Intentional no-op — see above why we can’t return a promise from this function
    });

  return {element};
}
