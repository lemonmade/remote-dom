import '@lemonmade/remote-ui/polyfill';

import {retain, createThreadFromWebWorker} from '@quilted/threads';
import {RemoteRootElement} from '@lemonmade/remote-ui/elements';

import type {RemoteEnvironment} from '../types.ts';

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
  if (customElements.get('remote-root') == null) {
    customElements.define('remote-root', RemoteRootElement);
  }

  const element = document.createElement('remote-root');

  const thread = createThreadFromWebWorker<RemoteEnvironment>(self as any, {
    expose: {
      connect(connection) {
        retain(connection);
        element.connect(connection);
      },
    },
  });

  return {element, thread};
}
