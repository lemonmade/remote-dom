import type {RemoteMutationCallback} from '@lemonmade/remote-ui';

export interface Renderer {
  accept(receive: (callback: RemoteMutationCallback) => void): void;
}
