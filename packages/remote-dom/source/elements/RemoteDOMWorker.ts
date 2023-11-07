import {retain, release, createThreadFromWebWorker} from '@quilted/threads';
import {DOMRemoteReceiver} from '@lemonmade/remote-ui/receiver';

import type {Renderer} from '../types.ts';

export class RemoteDOMWorker extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});
    const root = document.createElement('div');
    const worker = new Worker(this.getAttribute('src')!, {
      type: 'module',
    });

    const receiver = new DOMRemoteReceiver({retain, release});
    receiver.connect(root);

    createThreadFromWebWorker<Renderer>(worker, {
      expose: {
        accept(receive) {
          retain(receive);
          receive(receiver.receive);
        },
      },
    });

    shadow.append(root);
  }
}
