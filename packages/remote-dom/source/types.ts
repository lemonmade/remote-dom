import type {RemoteMutationCallback} from '@lemonmade/remote-ui';

export type {Thread} from '@quilted/threads';

export interface RemoteEnvironment {
  connect(callback: RemoteMutationCallback): void;
}
