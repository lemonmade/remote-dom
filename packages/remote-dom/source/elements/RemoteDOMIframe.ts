import {retain, release, createThreadFromIframe} from '@quilted/threads';
import {DOMRemoteReceiver} from '@lemonmade/remote-ui/receiver';

import type {Renderer} from '../types.ts';

export class RemoteDOMIframe extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});
    const iframe = document.createElement('iframe');
    const root = document.createElement('div');
    iframe.src = this.getAttribute('src')!;
    iframe.hidden = true;

    const receiver = new DOMRemoteReceiver({retain, release});
    receiver.connect(root);

    createThreadFromIframe<Renderer>(iframe, {
      expose: {
        accept(receive) {
          retain(receive);
          receive(receiver.receive);
        },
      },
    });

    shadow.append(iframe);
    shadow.append(root);
  }
}
