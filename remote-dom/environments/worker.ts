import {createWorkerEnvironment} from '@lemonmade/remote-dom/environments/worker';

const {element} = await createWorkerEnvironment();

export {element, element as root};
