import {createIframeEnvironment} from '@lemonmade/remote-dom/environment/iframe';
import {GLOBAL_ROOT} from './constants';

const {element} = await createIframeEnvironment();

export {element, element as root};

Reflect.defineProperty(globalThis, GLOBAL_ROOT, {value: element});
