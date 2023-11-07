import {retain, createThreadFromInsideIframe} from '@quilted/threads';
import {RemoteMutationObserver} from '@lemonmade/remote-ui/elements';

import type {Renderer} from '../types.ts';

export interface IframeEnvironmentOptions {
  root?: Element | string;
}

export async function createIframeEnvironment({
  root,
}: IframeEnvironmentOptions = {}) {
  const thread = createThreadFromInsideIframe<{}, Renderer>();

  const element = root
    ? typeof root === 'string'
      ? document.querySelector(root)
      : root
    : document.querySelector('remote-root') ?? document.body;

  if (element == null) {
    throw new Error(
      `Could not find a remote root. Make sure to pass a valid Element or CSS selector as the 'root' argument, or render a 'remote-root' element somewhere in your document.`,
    );
  }

  await thread.accept((callback) => {
    retain(callback);

    const observer = new RemoteMutationObserver(callback);
    observer.observe(element);
  });

  return {element};
}
