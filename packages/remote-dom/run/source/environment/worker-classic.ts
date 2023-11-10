import {createWorkerEnvironment} from '@lemonmade/remote-dom/environment/worker-classic';
import {GLOBAL_ROOT} from './constants';

const {element} = createWorkerEnvironment();

Reflect.defineProperty(globalThis, GLOBAL_ROOT, {value: element});
