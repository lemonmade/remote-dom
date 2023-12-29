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

export async function createWorkerEnvironment(
  _: WorkerEnvironmentOptions = {},
) {
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
