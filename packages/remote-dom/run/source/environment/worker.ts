import {createWorkerEnvironment} from '@lemonmade/remote-dom/environment/worker';
import {GLOBAL_ROOT} from './constants';

const {element} = await createWorkerEnvironment();

export {element, element as root};

Reflect.defineProperty(globalThis, GLOBAL_ROOT, {value: element});
