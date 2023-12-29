import {retain, release, createThreadFromWebWorker} from '@quilted/threads';
import {DOMRemoteReceiver} from '@lemonmade/remote-ui/receiver';

import type {RemoteEnvironment, Thread} from '../types.ts';

export class RemoteDOMWorker extends HTMLElement {
  thread?: Thread<RemoteEnvironment>;

  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});

    const worker = new Worker(this.getAttribute('src')!, {
      type: 'module',
    });
    const thread = createThreadFromWebWorker<{}, RemoteEnvironment>(worker);
    this.thread = thread;

    const root = document.createElement('div');
    const receiver = new DOMRemoteReceiver({retain, release});

    receiver.connect(root);
    shadow.append(root);

    thread.connect(receiver.connection).catch(() => {});
  }
}
