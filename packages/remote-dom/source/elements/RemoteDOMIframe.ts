import {retain, release, createThreadFromIframe} from '@quilted/threads';
import {DOMRemoteReceiver} from '@lemonmade/remote-ui/receiver';

import type {RemoteEnvironment, Thread} from '../types.ts';

export class RemoteDOMIframe extends HTMLElement {
  thread?: Thread<RemoteEnvironment>;

  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});

    const iframe = document.createElement('iframe');
    iframe.src = this.getAttribute('src')!;
    iframe.hidden = true;

    const thread = createThreadFromIframe<{}, RemoteEnvironment>(iframe);
    this.thread = thread;

    const root = document.createElement('div');
    const receiver = new DOMRemoteReceiver({retain, release});
    receiver.connect(root);

    shadow.append(root);
    shadow.append(iframe);

    thread.connect(receiver.connection).catch(() => {});
  }
}
