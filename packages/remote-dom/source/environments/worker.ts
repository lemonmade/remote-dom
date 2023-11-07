import '@lemonmade/remote-ui/polyfill';

import {retain, createThreadFromWebWorker} from '@quilted/threads';
import {RemoteRootElement} from '@lemonmade/remote-ui/elements';

import type {Renderer} from '../types.ts';

export interface WorkerEnvironmentOptions {}

customElements.define('remote-root', RemoteRootElement);

declare global {
  interface HTMLElementTagNameMap {
    'remote-root': InstanceType<typeof RemoteRootElement>;
  }
}

export async function createWorkerEnvironment(
  _: WorkerEnvironmentOptions = {},
) {
  const thread = createThreadFromWebWorker<{}, Renderer>(self as any);
  const element = document.createElement('remote-root');

  await thread.accept((callback) => {
    retain(callback);
    element.connect(callback);
  });

  return {element};
}
