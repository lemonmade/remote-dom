import type {RemoteConnection} from '@lemonmade/remote-ui';

export type {Thread} from '@quilted/threads';

export interface RemoteEnvironment {
  connect(connection: RemoteConnection): void;
}
